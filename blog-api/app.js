// 1. IMPORTS
require('dotenv').config(); // Loads environment variables from a .env file
const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes'); // FIX: Added './' to the path

// 2. INITIALIZE APP
const app = express();
const port = process.env.PORT || 3000;

// 3. MIDDLEWARE
app.use(express.json()); // To parse JSON request bodies

// 4. DATABASE CONNECTION
// Get the connection string from the .env file
const dbURI = process.env.MONGODB_URI;

// Mongoose returns a promise, so we use .then() and .catch()
mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // We only want to start the server if the DB connection is successful
    app.listen(port, () => {
        
      console.log(`Blog API server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// 5. ROUTES
// Tell the app to use the imported router for any request that starts with /posts
app.use('/posts', postRoutes);

// Optional: A simple root route to confirm the server is up
app.get('/', (req, res) => {
    res.send('Welcome to the Blog API!');
});
