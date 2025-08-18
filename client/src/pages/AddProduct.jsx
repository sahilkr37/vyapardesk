import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addProduct } from "../api/products";

export default function AddProduct() {
    const [form, setForm] = useState({
        name: "",
        code: "",
        category: "",
        price: "",
        cost: "",
        brand: "",
        description: "",
        quantity: "",
    });
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        try {
            const token = localStorage.getItem("token");
            await addProduct(
                {
                    ...form,
                    price: Number(form.price),
                    cost: Number(form.cost),
                    quantity: Number(form.quantity)
                },
                token
            );
            navigate("/products");
        } catch (error) {
            setErr(error.response?.data?.msg || "Failed to add product");
        }
    };

    return (
        <Navbar>
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                    <input
                        name="code"
                        value={form.code}
                        onChange={handleChange}
                        placeholder="Code"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                        <option value="">Select Category *</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                    <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                    <input
                        name="cost"
                        type="number"
                        value={form.cost}
                        onChange={handleChange}
                        placeholder="Cost"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                    <input
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        placeholder="Brand"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                    <input
                        name="quantity"
                        type="number"
                        value={form.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                    {err && <p className="text-red-600">{err}</p>}
                    <div className="flex gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </Navbar>
    );
}
