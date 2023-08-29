import jwt from 'jsonwebtoken'; // get payload (user id) from token
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Protect routes (have to be logged in to access that route)
const protect = asyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jsonwebtoken;

    if (token) {
        try {
            // Verify token: get userID from decoded object
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from the token (token has userID as payload)
            req.user = await User.findById(decoded.userID).select('-password');
            // Call next piece of middleware
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Unauthorized, invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Unauthorized, no token available');
    }

});

export { protect };

// Parse and check cookie