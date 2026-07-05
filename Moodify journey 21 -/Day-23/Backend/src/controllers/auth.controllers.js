const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

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
    try {
        const { username, email, password } = req.body;

        const isUserAlreadyExists = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        })

        if (isUserAlreadyExists) {
            return res.status(409).json({
                message: `User already exists`,
            });
        }

        const user = await userModel.create({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        })

        res.cookie('token', generateToken(user._id))

        return res.status(201).json({
            message: `User registered successfully`,
            user: {
                id: user._id,
                username,
                email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Internal server error`
        });
    }
}

async function login(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { username }, { email }
            ]
        }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: `Invalid credentials`,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: `Invalid credentials`,
            });
        }

        res.cookie('token', generateToken(user._id))

        return res.status(200).json({
            message: `User logged in`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: `Internal server error`
        });
    }
}

async function getMe(req, res) {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    return res.status(200).json({
        message: `Fetched user's details`,
        user
    });
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function logout(req, res) {

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Invalid token' });

    res.clearCookie("token");

    const blacklistToken = await blacklistModel.create({
        token
    })

    return res.status(200).json({
        message: `log out successfully`,
    });

}

module.exports = {
    login,
    register,
    logout,
    getMe
}