
import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// GET all customers with their order totals.
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        c.id,
        c.name,
        c.email,
        c.phone,
        c.location,
        c.status,
        c.membership,
        c.created_at,
        COUNT(DISTINCT o.id)::int AS orders,
        COALESCE(SUM(o.total_amount), 0) AS total_spent,
        MAX(o.order_date) AS last_order
      FROM customers c
      LEFT JOIN orders o ON o.customer_id = c.id
      GROUP BY
        c.id, c.name, c.email, c.phone,
        c.location, c.status, c.membership, c.created_at
      ORDER BY c.id DESC
    `);

    const customers = result.rows.map((customer) => ({
      key: String(customer.id),
      dbId: customer.id,
      id: `CUS-${String(customer.id).padStart(3, "0")}`,
      name: customer.name,
      email: customer.email,
      phone: customer.phone || "",
      location: customer.location || "Not provided",
      status: customer.status,
      orders: Number(customer.orders),
      totalSpent: Number(customer.total_spent),
      lastOrder: customer.last_order
        ? new Date(customer.last_order).toISOString().slice(0, 10)
        : "No orders yet",
      joinedDate: customer.created_at
        ? new Date(customer.created_at).toISOString().slice(0, 10)
        : "",
      favoriteCategory: "Not available",
      membership: customer.membership,
    }));

    res.json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customers.",
    });
  }
});

// PUT: Update a customer's status.
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Only allow the supported customer statuses.
    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer status.",
      });
    }

    const result = await pool.query(
      `UPDATE customers
       SET status = $1
       WHERE id = $2
       RETURNING id, name, status`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.json({
      success: true,
      message: "Customer status updated successfully.",
      customer: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating customer status:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update customer status.",
    });
  }
});


/*
  PUT: Update a customer's details in PostgreSQL.
  The URL must contain the actual database ID.
*/
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, location, membership } = req.body;

    // Validate the customer ID.
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer database ID.",
      });
    }

    // Validate required fields.
    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required.",
      });
    }

    // Update the existing customer.
    const result = await pool.query(
      `UPDATE customers
       SET name = $1,
           email = $2,
           phone = $3,
           location = $4,
           membership = $5
       WHERE id = $6
       RETURNING *`,
      [
        name.trim(),
        email.trim(),
        phone?.trim() || null,
        location?.trim() || null,
        membership || "Standard",
        Number(id),
      ]
    );

    // Check whether the customer exists.
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.json({
      success: true,
      message: "Customer updated successfully.",
      customer: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating customer:", error);

    // Handle duplicate email addresses.
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A customer with this email already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update customer.",
    });
  }
});

// POST: Add a new customer to PostgreSQL.
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, location, membership } = req.body;

    // Validate the required customer details.
    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Customer name and email are required.",
      });
    }

    // Save the new customer in the database.
    const result = await pool.query(
      `INSERT INTO customers
        (name, email, phone, location, membership, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        name.trim(),
        email.trim(),
        phone?.trim() || null,
        location?.trim() || null,
        membership || "Standard",
        "Active",
      ]
    );

    res.status(201).json({
      success: true,
      message: "Customer added successfully.",
      customer: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding customer:", error);

    // PostgreSQL error code 23505 means a unique constraint failed.
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "A customer with this email already exists.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to add customer.",
    });
  }
});


/*
  DELETE: Remove a customer from PostgreSQL.
*/
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the actual database ID.
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer database ID.",
      });
    }

    const result = await pool.query(
      `DELETE FROM customers
       WHERE id = $1
       RETURNING id`,
      [Number(id)]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    res.json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting customer:", error);

    // A customer may be linked to existing orders.
    if (error.code === "23503") {
      return res.status(409).json({
        success: false,
        message:
          "This customer has related records and cannot be deleted.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete customer.",
    });
  }
});

export default router;
