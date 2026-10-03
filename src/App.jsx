import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import DashboardPage from './features/dashboard/DashboardPage'
import LoginPage from './features/auth/LoginPage'
import ProtectedRoute from "./routes/ProtectedRoute";
import AllProjectsPage from "./features/projects/AllProjectsPage";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import NotFound from "./pages/NotFound";
import AppShell from "./layout/AppShell";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<AppShell />}>
                        <Route path="/dashboard" element={<DashboardPage />} />

                        {/* Role Protected */}
                        <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
                            <Route path="/projects" element={<AllProjectsPage />} />
                        </Route>

                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App
