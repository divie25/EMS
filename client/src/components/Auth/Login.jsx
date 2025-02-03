import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../config/config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(url + '/api/auth/login', { email, password });
            // Handle successful login (e.g., store token, redirect)
            console.log(response.data);
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                fontFamily: 'Arial, sans-serif',
                color: '#fff',
            }}
        >
            <h1>Environment Management System</h1>

            <div
                style={{
                    background: '#fff',
                    borderRadius: '10px',
                    padding: '30px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '400px',
                    color: '#333',
                }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2575fc' }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                    </div>
                    {error && (
                        <p
                            style={{
                                color: 'red',
                                marginBottom: '15px',
                                textAlign: 'center',
                            }}
                        >
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: loading ? '#ccc' : '#2575fc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
