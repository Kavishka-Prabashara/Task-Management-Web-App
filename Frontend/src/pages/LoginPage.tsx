import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Define your API base URL using the environment variable
    /*const API_BASE_URL = import.meta.env.VITE_API_URL; // <--- ADD THIS LINE*/

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://task-management-web-app-1lf3.vercel.app//api/auth/login`, { // <--- USE API_BASE_URL HERE
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok && data.token) {
                localStorage.setItem('token', data.token);
                navigate('/dashboard');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error logging in');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96 space-y-4">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <input
                    type="email"
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full p-2 border rounded"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Login
                </button>
                <p className="text-sm text-center">
                    Don't have an account? <a href="/register" className="text-blue-600 underline">Register</a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;