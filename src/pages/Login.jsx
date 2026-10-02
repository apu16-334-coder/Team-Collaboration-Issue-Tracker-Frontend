import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axiosClient from "../api/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";


function Login() {
    const { login } = useContext(AuthContext);

    const location = useLocation()
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axiosClient.post('/auth/login', formData, {
                skipAuthRedirect: true, // expected to 401 — don't force-redirect
            });

            login(response.data.data) // delegate to context

            navigate(location.state?.from?.pathname || '/dashboard')

        } catch (err) {
            setError(err.response?.data?.message || 'Login Failed')
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>

                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging In...' : 'Log In'}
                </button>

            </form>
        </>
    )
}

export default Login;