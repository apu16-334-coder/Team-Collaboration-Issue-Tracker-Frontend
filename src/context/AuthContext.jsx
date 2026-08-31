import { createContext, useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token) {
            setIsLoading(false);
            return;
        }

        async function fetchUser() {
            try {
                const response = await axiosClient.get('/users/me');
                setUser(response.data.data);
            } catch (err) {
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, [])

    function login (token, userData) {
        localStorage.setItem('token', token);
        setUser(userData);
    }

    function logout () {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <>
            <AuthContext.Provider value={{user, isLoading, login, logout}}>
                {children}
            </AuthContext.Provider>
        </>
    )
}