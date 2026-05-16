const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function generateToken(userId) {
    return jwt.sign(
        {
            id: userId,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
};

authRouter.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    const isUserExists = await userModel.findOne({ email });

    if (isUserExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        name, email, password: hash
    })

    res.cookie("jwt_token", generateToken(user._id))

    res.status(201).json({
        message: 'Registered successfully',
        user
    })
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordCorrect = user.password === crypto.createHash("sha256").update(password).digest('hex');

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    res.cookie("jwt_token",generateToken(user._id))

    res.status(201).json({
        message: 'logged in'
    })
});

authRouter.get('/get-me',async (req,res) => {
    const token = req.cookies.jwt_token;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    res.status(200).json({
        message: 'got you',
        user
    })
});

module.exports = authRouter;