const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// ✅ Allowed frontend origins for development and production
const allowedOrigins = [
    'http://localhost:5173',
    'https://task-management-web-app-xi.vercel.app',
    'https://task-management-web-app-1lf3.vercel.app',
    'https://task-management-web-app-backend.vercel.app'
];

// ✅ CORS middleware with origin check
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('CORS blocked: origin not allowed'), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ Connected to MongoDB');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () =>
            console.log(`🚀 Server running on port ${PORT}`)
        );
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));
