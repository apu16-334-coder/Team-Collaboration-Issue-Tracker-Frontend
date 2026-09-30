import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

function ProtectedRoute(params) {
    const { user, isLoading } = useContext(AuthContext)
    const location = useLocation()

    if(isLoading) return <p>Loading....</p>

    if(!user) return <Navigate to='/login' state={{ from: location}} />

    return <Outlet />
}

export default ProtectedRoute;