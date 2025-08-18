import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Home,
    PlusCircle,
    List,
    Users,
    LogOut,
} from "lucide-react";

const links = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Add Product", path: "/add-product", icon: <PlusCircle size={20} /> },
    { name: "List Product", path: "/products", icon: <List size={20} /> },
    { name: "Staffs", path: "/staffs", icon: <Users size={20} /> },
];

export default function Navbar({ children }) {
    const location = useLocation();

    return (
        <div className="flex min-h-screen">
            <nav className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-gray-700">
                    Your Brand
                </div>
                <ul className="flex-1">
                    {links.map(({ name, path, icon }) => (
                        <li key={name}>
                            <Link
                                to={path}
                                className={`flex items-center gap-3 p-4 hover:bg-gray-700 transition ${location.pathname === path ? "bg-gray-700" : ""
                                    }`}
                            >
                                {icon}
                                <span>{name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/";
                        }}
                        className="flex items-center gap-2 w-full hover:text-red-500 transition"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </nav>
            <main className="flex-1 bg-gray-100 p-6 overflow-auto">{children}</main>
        </div>
    );
}
