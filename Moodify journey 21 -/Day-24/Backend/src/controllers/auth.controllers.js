const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache');

function generateToken(userId) {
    return jwt.sign(
        {
            id: userId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )
}

async function register(req, res) {
    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserExists) {
        return res.status(409).json({
            message: `User already exists`,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
    });

    res.cookie('token', generateToken(user._id));

    return res.status(201).json({
        message: `User registered successfully`,
        user: {
            id: user._id,
            username,
            email,
            __v: user.__v
        }
    });

}

async function login(req, res) {
    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    }).select("+password")

    if (!isUserExists) {
        return res.status(409).json({
            message: `Invalid credentials`,
        });
    }

    const comparePassword = await bcrypt.compare(password, isUserExists.password);
    if (!comparePassword) {
        return res.status(401).json({
            message: `Invalid credentials`,
        });
    }

    res.cookie('token', generateToken(isUserExists._id));

    return res.status(200).json({
        message: `login successfully`,
        user: {
            id: isUserExists._id,
            username: isUserExists.username,
            email: isUserExists.email,         
        }
    });
}

async function logout(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not found",
        });
    }

    res.clearCookie('token');

    const blacklistToken = await redis.set(token, Date.now().toString(),'EX',60*60*24)

    return res.status(200).json({
        message: `logout successfully`,
    });
}

async function getMe(req, res) {

    const userId = req.userId;

    const user = await userModel.findById(userId);

    return res.status(200).json({
        message: `Fetched User's details`,
        user
    });
}

module.exports = {
    register,
    login,
    logout,
    getMe
}