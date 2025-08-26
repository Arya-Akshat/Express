
// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// GET /api/v1/analytics - Get mock analytics data (Protected)
router.get('/', protect, (req, res) => {
    // In a real app, this data would come from database queries.
    const mockAnalytics = {
        activeUsers: Math.floor(Math.random() * 1000) + 100,
        newUsersToday: Math.floor(Math.random() * 50) + 5,
        revenue: parseFloat((Math.random() * 10000 + 2000).toFixed(2)),
        topPages: ["/dashboard", "/pricing", "/docs", "/settings"]
    };
    res.json(mockAnalytics);
});

module.exports = router;