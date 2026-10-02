import { createContext, useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axiosClient.get('/users/me', {
                    skipAuthRedirect: true, // expected to 401 when logged out — don't force-redirect
                });
                setUser(response.data.data);
            } catch (err) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, [])

    function login(userData) {
        setUser(userData);
    }

    async function logout() {
        try {
            await axiosClient.post('/auth/logout');
        } catch (error) {
            // even if it fails, still clear local state
        } finally {
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}