
import express from "express";
import pool from "../config/database.js";

// Create a router for dashboard statistics.
const router = express.Router();

// GET /api/dashboard
// Fetch dashboard statistics from PostgreSQL.
router.get("/", async (req, res) => {
  try {
    // 1. Get today's revenue and order count.
    const todayResult = await pool.query(`
      SELECT
        COUNT(*)::int AS total_orders,
        COALESCE(
          SUM(
            CASE
              WHEN payment_status = 'Paid'
              THEN total_amount
              ELSE 0
            END
          ),
          0
        ) AS total_revenue
      FROM orders
      WHERE order_date >= CURRENT_DATE
        AND order_date < CURRENT_DATE + INTERVAL '1 day'
    `);

    // 2. Get the total number of customers.
    const customerResult = await pool.query(`
      SELECT COUNT(*)::int AS total_customers
      FROM customers
    `);

    // 3. Count products with low stock.
    // Here, low stock means 10 or fewer units.
    const stockResult = await pool.query(`
      SELECT COUNT(*)::int AS low_stock_items
      FROM products
      WHERE stock <= 10
    `);

    // 4. Get order counts grouped by order status.
    const statusResult = await pool.query(`
      SELECT
        order_status,
        COUNT(*)::int AS total
      FROM orders
      GROUP BY order_status
      ORDER BY order_status
    `);

    // 5. Get the five most recent orders.
    const recentOrdersResult = await pool.query(`
      SELECT
        o.id,
        o.customer_id,
        c.name AS customer_name,
        o.total_amount,
        o.order_status,
        o.payment_status,
        o.order_date
      FROM orders o
      LEFT JOIN customers c
        ON c.id = o.customer_id
      ORDER BY o.order_date DESC, o.id DESC
      LIMIT 5
    `);

    // 6. Get the four top-selling products.
    const topProductsResult = await pool.query(`
      SELECT
        p.id,
        p.name,
        p.price,
        p.stock,
        p.sold,
        p.category_id,
        COALESCE(c.name, 'Uncategorized') AS category,
        (p.price * p.sold) AS revenue
      FROM products p
      LEFT JOIN categories c
        ON c.id = p.category_id
      ORDER BY p.sold DESC, p.id DESC
      LIMIT 4
    `);

    // Send all results to the React dashboard.
    res.json({
      success: true,
      statistics: {
        todayOrders: todayResult.rows[0].total_orders,
        todayRevenue: Number(todayResult.rows[0].total_revenue),
        totalCustomers: customerResult.rows[0].total_customers,
        lowStockItems: stockResult.rows[0].low_stock_items,
      },
      orderStatuses: statusResult.rows,
      recentOrders: recentOrdersResult.rows,
      topProducts: topProductsResult.rows,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data.",
    });
  }
});

export default router;
