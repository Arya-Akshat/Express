require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// --- Core Middleware ---
app.use(helmet()); // Set security-related HTTP response headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON request bodies
app.use(morgan('dev')); // HTTP request logger middleware
app.use(rateLimiter); // Apply rate limiting to all requests

// --- Database Connection ---
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`SaaS Dashboard API running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('Database connection error:', err));

// --- API Routes ---
// We can version our API for future-proofing
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// A simple root route
app.get('/', (req, res) => {
    res.send('SaaS Dashboard API is running!');
});

// --- Error Handling Middleware ---
// This should be the last middleware
app.use(errorHandler);
