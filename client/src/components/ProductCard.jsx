// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ product }) {
    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.quantity}</p>
        </div>
    );
}
