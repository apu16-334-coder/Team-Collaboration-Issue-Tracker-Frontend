// src/layout/Topbar.jsx
import { useContext } from "react";
import { AuthContext } from "../features/auth/AuthContext";

function Topbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', padding: '8px 16px', borderBottom: '1px solid #ccc' }}>
            <span>{user.name}</span>
            <span>({user.role.replace('_', ' ')})</span>
            <button onClick={logout}>Logout</button>
        </header>
    );
}

export default Topbar;