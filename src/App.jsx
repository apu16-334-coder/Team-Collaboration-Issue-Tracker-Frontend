import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import Login from "./pages/Login"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Project from "./pages/Project"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes wrapped in ProtectedRoute and Layout */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Project />} />
                    <Route path="/projects/:id" element={<Project />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App