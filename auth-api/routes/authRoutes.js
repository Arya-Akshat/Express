const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- POST /auth/register: User Registration ---
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // The password hashing is handled automatically by the pre-save hook in the User model
        // FIX: Create an instance of the 'User' model
        const user = new User({ username, password });
        // FIX: Call .save() on the new user instance, not the model itself
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- POST /auth/login: User Login ---
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by their username
        // FIX: Use the 'User' model to find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If credentials are correct, create a JWT
        const payload = {
            id: user._id,
            username: user.username
        };

        // Sign the token with a secret key from your .env file
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({ token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
