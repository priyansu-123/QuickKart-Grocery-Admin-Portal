
import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Offers from "./pages/Offers";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ComponentsShowcase from "./pages/ComponentsShowcase";

import AdminLayout from "./layouts/AdminLayout";

// Protects the admin pages.
// If the user is not logged in, redirect to the login page.
function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Outlet renders the matching child route.
  return <Outlet />;
}

// Prevents logged-in users from seeing login and registration pages.
function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public home page */}
      <Route path="/" element={<Home />} />

      {/* Login and registration */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protect all admin pages */}
      <Route element={<ProtectedRoute />}>
        {/* Display AdminLayout around protected pages */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/components" element={<ComponentsShowcase />} />
        </Route>
      </Route>

      {/* Redirect unknown URLs to the home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
