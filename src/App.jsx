import axiosClient from "./api/axiosClient"
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout'

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Project from "./pages/Project"
import { AuthContext } from "./context/AuthContext"
import { useContext } from "react"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
    return (
        <>
            <Routes>
                {/* Public routes — no app shell, or a minimal one */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes — full app shell with Navbar */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Layout />} >
                        <Route index element={<Dashboard />} />
                        <Route path="project" element={<Project />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
