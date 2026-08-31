import axiosClient from "./api/axiosClient"
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout'

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { AuthContext } from "./context/AuthContext"
import { useContext } from "react"

function App() {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <>
            <Routes>
                {/* Public routes — no app shell, or a minimal one */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes — full app shell with Navbar */}         
                <Route path="/" element={<Layout />} >
                    <Route index element={<Dashboard />} />
                </Route>

            </Routes>
        </>
    )
}

export default App
