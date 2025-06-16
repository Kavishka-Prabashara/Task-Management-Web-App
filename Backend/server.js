const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// Allowed frontend origins
const allowedOrigins = ['https://task-management-web-app-xi.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (e.g., mobile apps, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy does not allow access from this origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
