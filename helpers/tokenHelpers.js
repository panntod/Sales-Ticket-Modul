require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.GenerateToken = (data) => {
    const token = jwt.sign(data, process.env.SECRET_KEY)
    return token
}

exports.ExtractToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return null;
    }
};