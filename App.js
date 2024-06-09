import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileVideo, FaFileImage, FaFilePdf, FaFileAudio } from 'react-icons/fa';

const Dashboard = ({ onLogout }) => {
    const [evidence, setEvidence] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [file, setFile] = useState(null);

    const investigators = [
        { name: 'Investigator 1', email: 'Investigator1@example.com', phone: '123-456-7890' },
        { name: 'Investigator 2', email: 'Investigator2@example.com', phone: '234-567-8901' },
        { name: 'Investigator 3', email: 'Investigator3@example.com', phone: '345-678-9012' },
    ];

    useEffect(() => {
        const fetchEvidence = async () => {
            try {
                const res = await axios.get('/api/evidence');
                setEvidence(res.data);
            } catch (err) {
                console.error(err.response?.data || err.message);
            }
        };
        fetchEvidence();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/api/evidence/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setEvidence([...evidence, res.data]);
            setFile(null);
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredEvidence = evidence.filter((item) =>
        item.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderIcon = (type) => {
        switch (type) {
            case 'video':
                return <FaFileVideo size={50} color="#ff0000" />;
            case 'image':
                return <FaFileImage size={50} color="#ff0000" />;
            case 'document':
                return <FaFilePdf size={50} color="#ff0000" />;
            case 'audio':
                return <FaFileAudio size={50} color="#ff0000" />;
            default:
                return null;
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Dashboard</h1>
            <button onClick={onLogout} style={styles.button}>Logout</button>
            <form onSubmit={handleUpload} style={styles.form}>
                <input type="file" onChange={handleFileChange} style={styles.input} />
                <button type="submit" style={styles.button}>Upload Evidence</button>
            </form>
            <input
                type="text"
                placeholder="Search evidence..."
                value={searchTerm}
                onChange={handleSearch}
                style={styles.search}
            />
            <ul style={styles.list}>
                {filteredEvidence.map((item) => (
                    <li key={item._id} style={styles.listItem}>
                        {renderIcon(item.type)}
                        <div style={styles.evidenceDetails}>
                            <span>{item.filename}</span>
                            <span>Uploaded by {item.uploadedBy.username}</span>
                            <span>on {new Date(item.uploadDate).toLocaleDateString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
            <div style={styles.contactBox}>
                <h2 style={styles.contactTitle}>Contact Us</h2>
                {investigators.map((investigator, index) => (
                    <div key={index} style={styles.investigator}>
                        <h3 style={styles.investigatorName}>{investigator.name}</h3>
                        <p>Email: {investigator.email}</p>
                        <p>Phone: {investigator.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/login', { username, password });
            if (res.data.success) {
                onLogin();
            } else {
                alert('Login failed');
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Login</h1>
            <form onSubmit={handleLogin} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#000', // black background
        color: '#fff', // white text
        minHeight: '100vh',
    },
    title: {
        fontSize: '2em',
        marginBottom: '20px',
        color: '#ff0000', // red color for title
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ff0000', // red border
        backgroundColor: '#222', // dark gray background
        color: '#fff', // white text
        marginBottom: '10px',
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#ff0000', // red background for button
        color: '#fff', // white text
        cursor: 'pointer',
    },
    search: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ff0000', // red border
        backgroundColor: '#222', // dark gray background
        color: '#fff', // white text
        marginBottom: '20px',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ff0000', // red border for list items
    },
    evidenceDetails: {
        marginLeft: '20px',
    },
    contactBox: {
        marginTop: '40px',
        padding: '20px',
        border: '1px solid #ff0000',
        borderRadius: '5px',
        backgroundColor: '#222',
    },
    contactTitle: {
        color: '#ff0000',
        marginBottom: '20px',
    },
    investigator: {
        marginBottom: '20px',
    },
    investigatorName: {
        fontSize: '1.2em',
        color: '#ff0000',
    },
};

export default App;
