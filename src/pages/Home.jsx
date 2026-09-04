import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <h1>Issue Tracker</h1>
            <Link to="/login">Sign In</Link>
            <Link to="/signup">Get Started</Link>
        </div>
    )
}

export default Home