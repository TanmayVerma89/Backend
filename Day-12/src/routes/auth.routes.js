const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const authRouter = express.Router();


authRouter.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    const isUserRegistered = await userModel.findOne({email}) 

    if(isUserRegistered)    return res.status(409).json({
        message: "User already exists with this email"
    })

    const user = await userModel.create({
        email, password, name
    }); 

    const token = jwt.sign(
        {
            id: user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("JWT-token", token)

    res.status(201).json({
        message: "User registration successfull",
        user,
        token
    }); 
})

module.exports = authRouter;    