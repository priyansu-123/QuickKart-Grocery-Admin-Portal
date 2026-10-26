import React from "react";
import {Navigate,Route,Routes} from "react-router-dom";
import {useAuth} from "./context/AuthContext";
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
// ProtectedRoute keeps admin pages inaccessible until the user signs in.
const ProtectedRoute=({children})=>useAuth().user?children:<Navigate to="/login" replace/>;
// PublicRoute redirects an already logged-in user to the dashboard.
const PublicRoute=({children})=>useAuth().user?<Navigate to="/dashboard" replace/>:children;
export default function App(){return <Routes><Route path="/" element={<Home/>}/><Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/><Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/><Route element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}><Route path="/dashboard" element={<Dashboard/>}/><Route path="/products" element={<Products/>}/><Route path="/orders" element={<Orders/>}/><Route path="/customers" element={<Customers/>}/><Route path="/reports" element={<Reports/>}/><Route path="/offers" element={<Offers/>}/><Route path="/settings" element={<Settings/>}/><Route path="/profile" element={<Profile/>}/><Route path="/components" element={<ComponentsShowcase/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
