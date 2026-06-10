const jwt = require('jsonwebtoken');

// Verifies the auth cookie and attaches the decoded user context to the request.
async function identifyUser(req, res, next) {
    const token = req.cookies.jwt_token;
    let decoded; // initialized already to avoid block scope conflicts

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Token expired, Unauthorized access"
        })
    }

    // Controllers read these values instead of decoding the token again.
    req.userId = decoded.id;
    req.username = decoded.username;
    req.user = decoded
    next();
}

module.exports = identifyUser;
