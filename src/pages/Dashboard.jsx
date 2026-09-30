import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <h2>Dashboard Page</h2>
            <h4>Welcome To DahsBoard...! {user.name.toLocaleUpperCase()}</h4>

            <Link to='/'>Home</Link> <br /> <br />
            <Link to='/projects'>Projects</Link> <br /> <br />
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default Dashboard;