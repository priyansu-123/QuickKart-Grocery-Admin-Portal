
import express from "express";
import pool from "../config/database.js";

// Create an Express router for product-related APIs.
const router = express.Router();

// GET: Retrieve all products from PostgreSQL.
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.category_id,
        c.name AS category,
        p.price,
        p.stock,
        p.sold,
        p.image_url,
        p.status,
        p.created_at,
        p.updated_at
      FROM products p
      LEFT JOIN categories c
        ON p.category_id = c.id
      ORDER BY p.id DESC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      products: result.rows,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
    });
  }
});

// POST: Save a new product in PostgreSQL.
router.post("/", async (req, res) => {
  try {
    const { name, category, price, stock, sold = 0 } = req.body;

    // Validate the required fields.
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      price === undefined ||
      price === null ||
      stock === undefined ||
      stock === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, category, price and stock are required.",
      });
    }

    // Validate price, stock and sold values.
    if (
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      !Number.isInteger(Number(stock)) ||
      Number(stock) < 0 ||
      !Number.isInteger(Number(sold)) ||
      Number(sold) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Price, stock or sold value is invalid.",
      });
    }

    // Find the category or create it if it does not exist.
    const categoryResult = await pool.query(
      `INSERT INTO categories (name)
       VALUES ($1)
       ON CONFLICT (name)
       DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      [category.trim()]
    );

    const categoryId = categoryResult.rows[0].id;

    // Determine stock status.
    const productStatus =
      Number(stock) === 0
        ? "Out of Stock"
        : Number(stock) <= 20
        ? "Low Stock"
        : "In Stock";

    // Insert the product into the database.
    const result = await pool.query(
      `INSERT INTO products
        (name, category_id, price, stock, sold, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, category_id, price, stock, sold, status, created_at`,
      [
        name.trim(),
        categoryId,
        Number(price),
        Number(stock),
        Number(sold),
        productStatus,
      ]
    );

    // Return the saved product to React.
    return res.status(201).json({
      success: true,
      message: "Product saved successfully.",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving product:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to save product in PostgreSQL.",
    });
  }
});

/*
 * DELETE: Remove a product from PostgreSQL using its ID.
 * Example URL: DELETE /api/products/5
 */
router.delete("/:id", async (req, res) => {
  try {
    // Get the product ID from the URL.
    const productId = Number(req.params.id);

    // Check whether the ID is a valid positive integer.
    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    // Delete the product from PostgreSQL.
    const result = await pool.query(
      `DELETE FROM products
       WHERE id = $1
       RETURNING id, name`,
      [productId]
    );

    // If no product matched the supplied ID, return 404.
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Send a success response to React.
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product.",
    });
  }
});

/*
 * PUT: Update an existing product in PostgreSQL.
 * URL: PUT /api/products/:id
 */
router.put("/:id", async (req, res) => {
  try {
    // Read and validate the product ID from the URL.
    const productId = Number(req.params.id);

    if (!Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    // Read updated values from the frontend request.
    const { name, category, price, stock } = req.body;

    // Validate the required fields.
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      price === "" ||
      price === undefined ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      stock === "" ||
      stock === undefined ||
      !Number.isInteger(Number(stock)) ||
      Number(stock) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid name, category, price, and stock.",
      });
    }

    // Check whether the product exists.
    const existingProduct = await pool.query(
      "SELECT id FROM products WHERE id = $1",
      [productId]
    );

    if (existingProduct.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Find the category or create it if it does not exist.
    const categoryResult = await pool.query(
      `INSERT INTO categories (name)
       VALUES ($1)
       ON CONFLICT (name)
       DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      [category.trim()]
    );

    const categoryId = categoryResult.rows[0].id;
    const updatedPrice = Number(price);
    const updatedStock = Number(stock);

    // Update the product in PostgreSQL.
    const result = await pool.query(
      `UPDATE products
       SET name = $1,
           category_id = $2,
           price = $3,
           stock = $4,
           status = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING id, name, category_id, price, stock, sold,
                 image_url, status, created_at, updated_at`,
      [
        name.trim(),
        categoryId,
        updatedPrice,
        updatedStock,
        updatedStock === 0
          ? "Out of Stock"
          : updatedStock <= 20
            ? "Low Stock"
            : "In Stock",
        productId,
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating product:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update product.",
    });
  }
});
// Export the router for server.js.
export default router;
