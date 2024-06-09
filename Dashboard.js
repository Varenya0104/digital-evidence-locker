import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFileVideo, FaFileImage, FaFilePdf, FaFileAudio } from 'react-icons/fa';

const Dashboard = () => {
    const [evidence, setEvidence] = useState([
        {
            _id: '1',
            filename: 'video1.mp4',
            uploadedBy: { username: 'user1' },
            uploadDate: '2023-06-01T12:34:56Z',
            type: 'video',
        },
        {
            _id: '2',
            filename: 'image1.jpg',
            uploadedBy: { username: 'user2' },
            uploadDate: '2023-06-02T14:20:00Z',
            type: 'image',
        },
        {
            _id: '3',
            filename: 'document1.pdf',
            uploadedBy: { username: 'user3' },
            uploadDate: '2023-06-03T09:15:30Z',
            type: 'document',
        },
        {
            _id: '4',
            filename: 'audio1.mp3',
            uploadedBy: { username: 'user4' },
            uploadDate: '2023-06-04T16:45:10Z',
            type: 'audio',
        },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [file, setFile] = useState(null);

    const investigators = [
        { name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '234-567-8901' },
        { name: 'Emily Johnson', email: 'emily.johnson@example.com', phone: '345-678-9012' },
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

export default Dashboard;
