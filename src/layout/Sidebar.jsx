// src/layout/Sidebar.jsx
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../features/auth/AuthContext";
import { navConfig } from "./navConfig";

function Sidebar() {
    const { user } = useContext(AuthContext);

    const items = navConfig.filter((item) => item.roles.includes(user.role));

    return (
        <nav style={{ width: "200px", padding: "1rem", borderRight: "1px solid #ccc" }}>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {items.map((item) => (
                    <li key={item.label}>
                        <NavLink
                            to={item.to}
                            style={({ isActive }) => ({
                                display: "block",
                                padding: "0.5rem",
                                fontWeight: isActive ? "bold" : "normal",
                                background: isActive ? "#eee" : "transparent",
                            })}
                        >{item.label}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Sidebar;