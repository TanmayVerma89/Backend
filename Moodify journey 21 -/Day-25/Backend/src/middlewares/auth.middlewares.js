const jwt = require('jsonwebtoken');
const redis = require('../config/cache');

async function identifyUser(req, res, next) {
    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: `Token is required`,
            });
        }

        const blacklistedToken = await redis.get(token);
        if (blacklistedToken) {
            return res.status(401).json({
                message: `Revocated token`,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;
        next()

    } catch (err) {
        return res.status(401).json({
            message: `Invalid or expired token`,
        });
    }
}

module.exports = {
    identifyUser
}