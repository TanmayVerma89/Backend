const jwt = require('jsonwebtoken');

async function identifyUser(req, res, next) {
    const token = req.cookies.jwt_token;
    let decoded; // initialized already to avoid block scope conflicts

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }

    req.userId = decoded.id;
    req.username = decoded.username;
    
    next();
}

module.exports = identifyUser;