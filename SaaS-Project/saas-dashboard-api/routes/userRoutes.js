// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

// GET /api/v1/users - Get all users (Admin only)
router.get('/', protect, admin, async (req, res, next) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// DELETE /api/v1/users/:id - Delete a user (Admin only)
router.delete('/:id', protect, admin, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;

// ---