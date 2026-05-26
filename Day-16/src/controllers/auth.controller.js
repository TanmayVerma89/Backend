const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');

function generateToken(userId) {
    return jwt.sign({
        id: userId
    },
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )
}

async function registercontroller(req, res) {
    const { username, email, password, bio, profile_image } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserExists) {
        return res.status(409).json({
            message: 'user already exists' + (isUserExists.email === email ? "with this email" : "with this username")
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username, email, password:hashedPassword, bio, profile_image
    })

    res.cookie("jwt_token",generateToken(user._id));

    res.status(201).json({
        message: "User registered",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image:user.profile_image
        }
    })
}

async function loginController(req,res) {
    const {username,email,password} = req.body;

    const user = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        res.status(404).json({
            message: "User NOT FOUND"
        })
    }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)


    if (!isPasswordCorrect) {
        return res.status(409).json({
            message: "Invalid user credentials"
        })
    }

    res.cookie("jwt_token",generateToken(user._id));

    res.status(200).json({
        message: "User logged in",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image:user.profile_image
        }
    })
}

module.exports = {
    registercontroller,
    loginController
}