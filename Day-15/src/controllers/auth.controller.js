const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateToken(userId) {
    return jwt.sign({
        id: userId
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )
}

async function registerController(req, res) {
    const { username, email, password, bio, profile_image } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserExists) {
        return res.status(409).json({
            message: "User already exists " + (isUserExists.email === email ?
                "with this Email" : "with this UserName")
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username, email, password: hash, bio, profile_image
    })

    res.cookie("jwt_token", generateToken(user.username))

    res.status(201).json({
        message: 'user registered',
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profile_image: user.profile_image,
        }
    })
}

async function loginController(req, res) {

    const { username, email, password } = req.body;

    // Now we know about the login page user either login using username or email
    // So for that we create find user by conditional search

    const user = await userModel.findOne({
        $or: [
            {
                // condition
                username: username
            },
            {
                // condition
                email: email
            }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    res.cookie("jwt_token", generateToken(user._id))

    res.status(200).json({
        message: 'Logged in',
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image,
            id: user._id
        }
    })
}

module.exports = {
    registerController,
    loginController
}