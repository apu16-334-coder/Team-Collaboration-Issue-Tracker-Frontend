import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute(params) {
    const location = useLocation();

    const {user, isLoading} = useContext(AuthContext);

    if(isLoading) return <p>Loading...</p>

    if(!user) return <Navigate to="/login" state={{ from: location }}  replace />

    return <Outlet />
}

export default ProtectedRoute;