import jwt from 'jsonwebtoken'
import { redis } from '../config/blacklist.redis.js'

export async function identifyUser(req, res, next) {
    try {
        const token = req?.cookies?.token

        if (!token) {
            return res.status(401).json({ message: 'Authentication token missing' })
        }
        const blacklistedToken = await redis.get(token);
        if (blacklistedToken) {
            return res.status(409).json({
                message: `Invalid or revoked token`,
            });
        }

        // jwt.verify throws on invalid/expired tokens
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: 'Invalid or expired token' })
        }

        req.userId = decoded.id
        return next()
    } catch (err) {
        if (err && err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' })
        }
        if (err && err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' })
        }
        console.error('identifyUser middleware error:', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}