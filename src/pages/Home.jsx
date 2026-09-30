import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Home() {
    const { user, logout } = useContext(AuthContext);

    const content = user ?
        <div>
            <Link to='/dashboard'>Dashboard</Link> <br /> <br />
            <button onClick={logout}>Logout</button>
        </div>
        : <Link to='/login'>Login</Link>


    return (
        <div>
            <h1>Issue Tracker</h1>
            {content}
        </div>
    )
}

export default Home;