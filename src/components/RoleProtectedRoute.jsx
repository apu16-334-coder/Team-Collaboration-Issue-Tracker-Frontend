import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function RoleProtectedRoute({ allowedRoles }) {
    const { user } = useContext(AuthContext)

    if (!allowedRoles.includes(user?.role)) return <Navigate to='/dashboard' replace />

    return <Outlet />
}

export default RoleProtectedRoute;