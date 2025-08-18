import React, { useState, useEffect } from "react";
import { getProducts } from "../api/products";
import Navbar from "../components/Navbar";

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await getProducts(token);
                setProducts(res.data);
            } catch {
                setErr("Failed to load products");
            }
        };
        loadProducts();
    }, []);

    return (
        <Navbar>
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Product List</h1>
                {err && <p className="text-red-600 mb-4">{err}</p>}
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Product</th>
                            <th className="border border-gray-300 p-2">Code</th>
                            <th className="border border-gray-300 p-2">Category</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Brand</th>
                            <th className="border border-gray-300 p-2">Cost</th>
                            <th className="border border-gray-300 p-2">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No products found.
                                </td>
                            </tr>
                        )}
                        {products.map((p) => (
                            <tr key={p._id}>
                                <td className="border border-gray-300 p-2">{p.name}</td>
                                <td className="border border-gray-300 p-2">{p.code}</td>
                                <td className="border border-gray-300 p-2">{p.category}</td>
                                <td className="border border-gray-300 p-2">${p.price}</td>
                                <td className="border border-gray-300 p-2">{p.brand}</td>
                                <td className="border border-gray-300 p-2">${p.cost}</td>
                                <td className="border border-gray-300 p-2">{p.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Navbar>
    );
}
