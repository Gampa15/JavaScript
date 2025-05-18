const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to DB
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api', uploadRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('SmartStay Backend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
