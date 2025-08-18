import React from "react";
import Navbar from "../components/Navbar";

export default function Staffs({
    staffs = [
        { name: "Jeet Haider", role: "Manager", avatar: "https://via.placeholder.com/40" },
        { name: "Riya Sharma", role: "Sales Executive", avatar: "https://via.placeholder.com/40" },
        { name: "Rahul Singh", role: "Support Staff", avatar: "https://via.placeholder.com/40" },
    ],
}) {
    return (
        <Navbar>
            <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Staffs</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {staffs.map((staff, idx) => (
                        <div key={idx} className="flex items-center gap-4 border border-gray-300 rounded p-4">
                            {staff.avatar ? (
                                <img src={staff.avatar} alt={staff.name} className="w-16 h-16 rounded-full" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gray-200" />
                            )}
                            <div>
                                <h3 className="font-semibold">{staff.name}</h3>
                                <p className="text-gray-600">{staff.role}</p>
                            </div>
                            <button className="ml-auto text-blue-600 hover:underline">View</button>
                        </div>
                    ))}
                </div>
            </div>
        </Navbar>
    );
}
