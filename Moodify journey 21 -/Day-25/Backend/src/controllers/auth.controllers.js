const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const redis = require('../config/cache');

const generateToken = (userId) => {
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
    const { username, password, email } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })
    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: `User Already Exists`,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    res.cookie('token', generateToken(user._id));

    return res.status(201).json({
        message: `User registered successfully`,
        user: {
            id: user._id,
            username,
            email,
        }
    });
}

async function login(req, res) {
    const { username, password, email } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    }).select("+password")
    if (!user) {
        return res.status(409).json({
            message: `Invalid credentials`,
        });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(409).json({
            message: `Invalid credentials`,
        }); 
    }

    res.cookie('token', generateToken(user._id))

    return res.status(200).json({
        message: `User login successfully`,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function getMe(req, res) {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    return res.status(200).json({
        message: `Fetched User data`,
        user
    });
}

async function logout(req, res) {
    const token = req.cookies.token;
    if (!token) {
    return res.status(401).json({
        message: "Authentication token is required",
    });
}
    res.clearCookie('token');

    await redis.set(token,Date.now().toString(),'EX', 60*60*24);

    return res.status(201).json({
        message: `User logout successfully`,
    });
}

module.exports = {
    register,
    login,
    getMe,
    logout
}