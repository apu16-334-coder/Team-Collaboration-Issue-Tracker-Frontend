import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ProtectedRoute from "./components/ProtectedRoute";
import Projects from "./pages/Projects";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Role Protected */}
                    <Route element= {<RoleProtectedRoute allowedRoles={['admin']} />}>
                        <Route path="/projects" element={<Projects />} />
                    </Route>
                   
                </Route>
            </Routes>
        </>
    )
}

export default App
