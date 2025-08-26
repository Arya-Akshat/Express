const jwt = require('jsonwebtoken');
const User = require('../models/User'); // FIX: Changed variable to uppercase 'User' to match convention

// This is the "bouncer" middleware.
const protect = async (req, res, next) => {
    let token;

    // FIX: Changed 'StartsWith' to 'startsWith' (it's case-sensitive)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Get the token from the header (e.g., "Bearer eyJhbGciOi...")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Get the user from the database using the ID from the token
            // We select '-password' to exclude the password field from the result
            req.user = await User.findById(decoded.id).select('-password');
            
            // 4. If everything is good, call next() to proceed to the protected route
            next();
        } catch (error) {
            // FIX: Corrected the response syntax. Send status first, then the JSON object.
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        // FIX: Sending a consistent JSON object for the error message
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect;
