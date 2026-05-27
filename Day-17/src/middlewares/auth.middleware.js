const jwt = require('jsonwebtoken');

async function identifyUser(req, res, next) {
    const token = req.cookies.jwt_token;

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    req.user = decoded;
    next();
}

module.exports = identifyUser;