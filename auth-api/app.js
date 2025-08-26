//IMPORTS
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/authRoutes');
const protect = require('.//middleware/authMiddleware');

//INITIALIZE EXPRESS
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());


//database connection
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

//routes

app.use('/auth', auth); 

//protected route 

app.get('/profile', protect, (req,res) => {
    res.status(200).json({
        username: req.user.username,
        message: 'Welcome to your profile!'
    });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Authentication API');

});
