import userModel from "../models/user.model.js"
import { sendEmail } from "../services/mail.service.js";
import jwt from 'jsonwebtoken'

function generateToken(userId) {
    return jwt.sign({
        id: userId
    },
        process.env.JWT_SECRET,
        { expiresIn: '2d' }
    )
}

async function register(req, res) {
    const { username, email, password } = req.body

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })
    if (isUserExists) {
        return res.status(400).json({
            message: `User already exists with this ` + (isUserExists.username === username ? "username" : "email"),
            success: false,
            err: "User already exists"
        });
    }

    const user = await userModel.create({
        username, email, password
    })

    const emailVerificationToken = await generateToken(user._id);

    await sendEmail({
        to: user.email,
        subject: "Welcome to Tanmay's Perplexity 🚀",
        html: `<p>Hi ${user.username},</p>
                <p>Thanks for signing up for <strong>Tanmay's Perplexity</strong> — a personal project I've been building. Glad to have you trying it out!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href = "http://localhost:${process.env.PORT}/api/auth/verify-email?token=${emailVerificationToken}">Click Here</a>
                <p>If you did not create an account, Please ignore this email.</p>
                <p>Best,<br>Tanmay</p>`,
        text: `Hi ${user.username},\n\nThanks for signing up for Tanmay's Perplexity — a personal project I've been building. Glad to have you trying it out!\n\nBest,\nTanmay`
    })

    res.status(201).json({
        message: `User registered successfully`,
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function verifyEmail(req, res) {
    const token = req.query.token;

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(400).json({
                message: `Invalid token`,
                success: false,
                err: "user not found"
            });
        }

        user.verified = true;

        await user.save();

        const html = `
                    <h1>Email verified successfully!</h1>
                    <p>Your email has been verified, You can now log in to your account.</p>
                    <a href="http://localhost:${process.env.PORT}/api/auth/login">Go to login</a>
                    `

        res.send(html);

    } catch (error) {
        return res.status(400).json({
            message: `Inavlid or Expired token`,
            error
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(400).json({
            message: `Invalid credentials`,
            success: false,
            err: 'Invalid credentials'
        });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(400).json({
            message: `Invalid credentials`,
            success: false,
            err: 'Invalid credentials'
        });
    }

    if (!user.verified) {
        return res.status(400).json({
            message: `Please verify your email before logging in`,
            success: false,
            err: 'Email is not verified'
        })
    }

    res.cookie('token',generateToken(user._id))

    return res.status(200).json({
        message: `User logged in successfully`,
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email,
        }
    });
}

async function getMe(req,res) {
    const userId = req.userId;
    
    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(400).json({
            message: `User not found`,
            success: false,
            err: 'User not found'
        });
    }

    return res.status(200).json({
        message: `Fetched user details`,
        success: true,
        user
    });
}

const authController = {
    register,
    login,
    verifyEmail,
    getMe
}

export default authController