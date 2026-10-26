
import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// GET: Retrieve orders, customer details, and purchased products.
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        o.id,
        o.customer_id,
        o.total_amount,
        o.payment_status,
        o.order_status,
        o.order_date,

        c.name AS customer_name,
        c.email AS customer_email,
        c.phone AS customer_phone,
        c.location AS customer_address,

        COALESCE(
          json_agg(
            json_build_object(
              'productId', p.id,
              'name', p.name,
              'quantity', oi.quantity,
              'price', oi.price
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'::json
        ) AS items

      FROM orders o

      LEFT JOIN customers c
        ON o.customer_id = c.id

      LEFT JOIN order_items oi
        ON o.id = oi.order_id

      LEFT JOIN products p
        ON oi.product_id = p.id

      GROUP BY
        o.id,
        c.id

      ORDER BY o.order_date DESC;
    `);

    // Convert database field names into useful frontend fields.
    const orders = result.rows.map((order) => ({
      key: String(order.id),
      id: order.id,
      orderId: `ORD-${order.id}`,
      customer: order.customer_name || "Unknown Customer",
      email: order.customer_email || "",
      phone: order.customer_phone || "",
      address: order.customer_address || "",
      items: order.items,
      amount: Number(order.total_amount || 0),
      payment: order.payment_status || "Unknown",
      paymentMethod: "Not recorded",
      status: order.order_status || "Pending",
      orderDate: order.order_date,
      orderTime: "",
      deliveryPerson: "Not assigned",
      deliveryProgress: 0
    }));

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error("Error fetching orders:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders from the database."
    });
  }
});
// PUT: Update the status of an existing order.
router.put("/:id/status", async (req, res) => {
  try {
    // Read the order ID from the URL.
    const { id } = req.params;

    // Read the new status from the request body.
    const { order_status } = req.body;

    // Validate the order ID.
    if (!/^\d+$/.test(id) || Number(id) < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID."
      });
    }

    // Only allow these order statuses.
    const allowedStatuses = [
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ];

    if (!allowedStatuses.includes(order_status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status."
      });
    }

    // Update the order in PostgreSQL.
    const result = await pool.query(
      `UPDATE orders
       SET order_status = $1
       WHERE id = $2
       RETURNING id, order_status`,
      [order_status, Number(id)]
    );

    // Check whether the order exists.
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found."
      });
    }

    // Return the updated order.
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order: result.rows[0]
    });
  } catch (error) {
    console.error("Error updating order status:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status."
    });
  }
});
export default router;
