import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import useMutation from "../../shared/hooks/useMutation";


function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const { mutate, isLoading, error } = useMutation();

    const location = useLocation()
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
            const result = await mutate('post', '/auth/login', formData, { skipAuthRedirect: true });
            if(!result.ok) return; 

            login(result?.data?.data); // delegate to context
            navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
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

export default LoginPage;