const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function identifyUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not found",
        });
    }

    const blacklistedToken = await redis.get(token);
    if (blacklistedToken) {
        return res.status(409).json({
            message: `Invalid token`,
        });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}

module.exports = {
    identifyUser
}