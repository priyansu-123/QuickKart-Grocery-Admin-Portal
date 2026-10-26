// ------------------------------------------------------------
// server.js
// ------------------------------------------------------------
// Main entry point of the QuickKart backend.
// ------------------------------------------------------------

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/database.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// ------------------------------------------------------------
// LOAD ENVIRONMENT VARIABLES
// ------------------------------------------------------------

dotenv.config();

// ------------------------------------------------------------
// CREATE EXPRESS APPLICATION
// ------------------------------------------------------------

const app = express();

// ------------------------------------------------------------
// PORT
// ------------------------------------------------------------

const PORT = process.env.PORT || 5000;

// ------------------------------------------------------------
// MIDDLEWARE
// ------------------------------------------------------------

// Allows React frontend to communicate with Express
app.use(cors());

// Allows Express to receive JSON data
app.use(express.json());

// ------------------------------------------------------------
// HOME ROUTE
// ------------------------------------------------------------

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "QuickKart backend is running!",
    });

});

// ------------------------------------------------------------
// DATABASE TEST ROUTE
// ------------------------------------------------------------
// Test whether Express can connect to PostgreSQL.
app.get("/api/test-db", async (req, res) => {
    try {
        // Run a simple query against PostgreSQL.
        const result = await pool.query("SELECT NOW()");

        // Connection succeeded.
        res.json({
            success: true,
            message: "PostgreSQL connection successful!",
            databaseTime: result.rows[0].now,
        });

    } catch (error) {
        // Print the full database error in VS Code.
        console.error("DATABASE ERROR CODE:", error.code);
        console.error("DATABASE ERROR MESSAGE:", error.message);

        // Send the error details to the browser.
        res.status(500).json({
            success: false,
            message: "PostgreSQL connection failed.",
            errorCode: error.code || "UNKNOWN",
            error: error.message,
        });
    }
});

// ------------------------------------------------------------
// PRODUCT ROUTES
// ------------------------------------------------------------

app.use("/api/products", productRoutes);

// ------------------------------------------------------------
// ORDERS ROUTES
// ------------------------------------------------------------

app.use("/api/orders", orderRoutes);
// ------------------------------------------------------------
// CUSTOMER ROUTES
// ------------------------------------------------------------
app.use("/api/customers", customerRoutes);
// ------------------------------------------------------------
// DASHBOARD ROUTES
// ------------------------------------------------------------
app.use("/api/dashboard", dashboardRoutes);

// ------------------------------------------------------------
// START SERVER
// ------------------------------------------------------------

app.listen(PORT, () => {

    console.log("----------------------------------------");
    console.log("QuickKart Backend Started");
    console.log(`Server: http://localhost:${PORT}`);
    console.log("----------------------------------------");

});