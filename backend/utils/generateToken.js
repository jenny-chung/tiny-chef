import jwt from 'jsonwebtoken';

const generateToken = (res, userID) => {
    // Sign token with userID
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });

    res.cookie('jsonwebtoken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
    });
};

export default generateToken;