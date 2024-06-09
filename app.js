const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const evidenceRoutes = require('./routes/evidenceRoutes');
const path = require('path');
const cors = require('cors'); // Import CORS middleware
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

// Apply CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use('/api/users', userRoutes);
app.use('/api/evidence', evidenceRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
