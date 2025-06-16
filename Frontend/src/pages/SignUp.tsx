import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Define your API base URL using the environment variable
    /*const API_BASE_URL = import.meta.env.VITE_API_URL; // <--- ADD THIS LINE*/

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://task-management-web-app-1lf3.vercel.app/api/auth/register`, { // <--- USE API_BASE_URL HERE
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                alert('Registration successful. Please login.');
                navigate('/');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            alert('Error registering');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-96 space-y-4">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
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
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Register
                </button>
                <p className="text-sm text-center">
                    Already have an account? <a href="/" className="text-blue-600 underline">Login</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;