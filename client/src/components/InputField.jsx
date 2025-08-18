// src/components/InputField.jsx
import React from "react";

export default function InputField({ icon, type = "text", placeholder, value, onChange, name, required = false }) {
    return (
        <div className="input-field">
            {icon && <span className="input-icon">{icon}</span>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                required={required}
                autoComplete="off"
            />
        </div>
    );
}
