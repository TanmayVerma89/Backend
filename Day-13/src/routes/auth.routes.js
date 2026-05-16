const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authRouter = express.Router();

function generateToken(userId) {
    return jwt.sign(
        {
            id: userId,
        },
        process.env.JWT_SECRET
    )    
}

authRouter.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists with this email"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex');

    const user = await userModel.create({
        name, email, password: hash
    });

    res.cookie("jwt_token", generateToken(user._id));

    res.status(201).json({
        message: 'User registered',
        user
    })
});

/**
 * /api/auth/login
*/
authRouter.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest('hex');
 
    if (hash !== user.password) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }; 

    res.cookie("jwt_token", generateToken(user._id));

    res.status(201).json({
        message: 'Logged in successfully',
        user
    })
});


module.exports = authRouter;