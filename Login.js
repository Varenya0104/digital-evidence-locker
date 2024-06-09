import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const loginData = {
            username: "admin",
            password: "password123"
        };

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
            setIsLoading(false);
            setIsLoggedIn(true);
            // Handle successful login, such as saving the token, redirecting, etc.
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.msg : 'An unexpected error occurred');
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Login</h1>
            {isLoggedIn ? (
                <div>
                    <h2 style={styles.welcome}>Welcome, {username}!</h2>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" disabled={isLoading} style={styles.button}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            )}
            {error && <div style={styles.error}>{error}</div>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#000', // black background
        color: '#fff', // white text
    },
    title: {
        fontSize: '2em',
        marginBottom: '20px',
        color: '#ff0000', // red color for title
    },
    welcome: {
        color: '#ff0000', // red color for welcome message
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        color: '#ff0000', // red color for labels
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ff0000', // red border for inputs
        backgroundColor: '#222', // dark gray input background
        color: '#fff', // white text
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#ff0000', // red background for button
        color: '#fff', // white text
        cursor: 'pointer',
    },
    error: {
        marginTop: '20px',
        color: 'red',
    },
};

export default Login;
