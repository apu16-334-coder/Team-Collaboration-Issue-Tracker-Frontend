import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import Login from "./pages/Login"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Project from "./pages/Project"
import ProtectedRoute from "./components/ProtectedRoute"
import RoleProtectedRoute from "./components/RoleProtectedRoute"

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

                    {/* Role Protected */}
                    <Route element= {<RoleProtectedRoute allowedRoles={['admin']} />}>
                        <Route path="/projects" element={<Project />} />
                    </Route>

                    <Route path="/projects/:id" element={<Project />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default App