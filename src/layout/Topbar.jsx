import { useContext } from "react";
import { AuthContext } from "../features/auth/AuthContext";

function Topbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header style={{ display: 'flex'}}>
            <span>{user.name}</span>
            <span>({user?.role.replace('_', ' ')})</span>
            <button onClick={logout}>Logout</button>
        </header>
    );
}

export default Topbar;