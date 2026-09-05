import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

function RoleProtectedRoute({allowedRoles}) {
    const { user } = useContext(AuthContext);

    if (!allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />

    return <Outlet />
}

export default RoleProtectedRoute;