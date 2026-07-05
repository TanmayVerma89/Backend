const userModel = require("../models/auth.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(userId, username) {
    return jwt.sign({
        id: userId,
        username: username
    }, process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserExists) {
        return res.status(409).json({
            message: `User already exists with this ${username === isUserExists.username ? `username` : `email`}`,
        });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username, email, password: hashedPass
    })

    res.cookie("token", generateToken(user._id, user.username));


    return res.status(201).json({
        message: `User registered`,
        user
    });
}

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (!isUserExists) {
        res.status(400).json({
            message: `Invalid username/email or password`,
        });
    }

    const checkPass = await bcrypt.compare(password, isUserExists.password)

    if (!checkPass) {
        return res.status(401).json({
            message: `invalid user credentials`,
        });
    }

    res.cookies("token", generateToken(isUserExists._id, isUserExists.username))

    return res.status(201).json({
        message: `User registered`,
        user
    });
}

async function getMe(req, res) {
    const userId = req.user.id;

    const user = await userModel.findOne(userId);

    return res.status(200).json({
        message: `Fetched user's details`,
        user
    });
}

module.exports = {
    loginUser,
    registerUser,
    getMe
}