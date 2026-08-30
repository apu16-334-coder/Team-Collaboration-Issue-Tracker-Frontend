import axiosClient from "../api/axiosClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(e) {
        const { value, name } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit (e) {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axiosClient.post('/auth/login', formData)

            console.log(response);

            // Assuming the token is at response.data.token — adjust once confirmed
            localStorage.setItem('token', response.data.token);

            navigate('/');
            
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        } finally {
            setIsLoading(false)
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