// src/components/StaffCard.jsx
import React from "react";

export default function StaffCard({ staff }) {
    return (
        <div className="staff-card">
            {staff.avatar ? (
                <img src={staff.avatar} alt={`${staff.name} avatar`} />
            ) : (
                <div className="avatar-placeholder" />
            )}
            <div>
                <h4>{staff.name}</h4>
                <p>{staff.role}</p>
            </div>
            <button>View</button>
        </div>
    );
}
