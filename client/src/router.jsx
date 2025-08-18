// src/router.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import Staffs from "./pages/Staffs";

const isAuthenticated = () => !!localStorage.getItem("token");

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protect these routes below */}
            <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/add-product" element={isAuthenticated() ? <AddProduct /> : <Navigate to="/" />} />
            <Route path="/products" element={isAuthenticated() ? <ListProduct /> : <Navigate to="/" />} />
            <Route path="/staffs" element={isAuthenticated() ? <Staffs /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
