import React, { useState, useEffect } from "react";
import { getProducts } from "../api/products";
import { Search, Edit3 } from "lucide-react"; // using lucide icons for search + edit

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [err, setErr] = useState("");
    const [search, setSearch] = useState("");

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

    // filter products by search
    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.code.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase()) ||
            p.brand.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">
            {/* Title */}
            <h1 className="text-2xl font-bold mb-6 text-[#3b38a0]">
                Product List
            </h1>
            <p className="text-gray-500 mb-4">
                Browse and manage your products
            </p>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3b38a0]"
                    size={18}
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products, code, category, brand..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2e2a80] focus:outline-none"
                />
            </div>

            {/* Error */}
            {err && <p className="text-red-600 mb-4">{err}</p>}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Code</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Brand</th>
                            <th className="px-6 py-3">Cost</th>
                            <th className="px-6 py-3">Quantity</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No products found.
                                </td>
                            </tr>
                        )}

                        {filteredProducts.map((p) => (
                            <tr
                                key={p._id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                {/* Product without image */}
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-900">
                                        {p.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                        {p.description}
                                    </p>
                                </td>

                                <td className="px-6 py-4 text-gray-700">{p.code}</td>
                                <td className="px-6 py-4 text-gray-700">{p.category}</td>
                                <td className="px-6 py-4 text-gray-900 font-medium">
                                    ${p.price}
                                </td>
                                <td className="px-6 py-4 text-gray-700">{p.brand}</td>
                                <td className="px-6 py-4 text-gray-700">${p.cost}</td>
                                <td className="px-6 py-4">{p.quantity}</td>

                                {/* Action button with custom color */}
                                <td className="px-6 py-4">
                                    <button className="p-2 rounded-lg text-[#3b38a0] hover:text-[#2e2a80] transition-colors">
                                        <Edit3 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
