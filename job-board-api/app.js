require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database Connection
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Job Board API server running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Job Board API!');
});
