const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// ✅ Allow both your frontend deployments
const allowedOrigins = [
    'https://task-management-web-app-xi.vercel.app',
    'http://localhost:5173' // Optional: for local testing
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like Postman or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('CORS blocked: origin not allowed'), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () =>
            console.log(`Server running on port ${process.env.PORT}`)
        );
    })
    .catch(err => console.error('MongoDB connection error:', err));
