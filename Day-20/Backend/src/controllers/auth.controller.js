const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');

// Keep token creation in one place so register and login share the same payload format.
// Generate JWT token 
function generateToken(userId, username) {
    return jwt.sign({
        id: userId,
        username: username
    },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
}

/**
 * @description logic for registering new user while eliminating bad request for User
*/
async function registercontroller(req, res) {
    const { username, email, password, bio, profile_image } = req.body;

    // Checks if user already registered or not
    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserExists) {
        return res.status(409).json({
            message: 'user already exists' + (isUserExists.email === email ? "with this email" : "with this username")
        })
    }

    // convert normal string password to hasd format by bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register user and create new document in Database
    const user = await userModel.create({
        username, email, password: hashedPassword, bio, profile_image
    })

    // sets token in cookie in user's browser
    res.cookie("jwt_token", generateToken(user._id, user.username));

    res.status(201).json({
        message: "User registered",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })
}

/**
 * @description logic for log in existing user while eliminating bad request for User
*/
async function loginController(req, res) {
    const { username, email, password } = req.body;

    // Allow login with either a username or an email address.
    // checks if user even exists or not
    const user = await userModel.findOne({
        $or: [{ username }, { email }]
    }).select('+password') // paasword by default read nhi ho sakta h because of userSchema. So, .select('+password') to read those 

    if (!user) {
        res.status(404).json({
            message: "User NOT FOUND"
        })
    }

    // bcrypt.compare(string, hashedPassword) compare if it is equal or not
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    // Checks if password is correct or not
    if (!isPasswordCorrect) {
        return res.status(409).json({
            message: "Invalid user credentials"
        })
    }

    // Sets cookie in user's browser
    res.cookie("jwt_token", generateToken(user._id, user.username));

    res.status(200).json({
        message: "User logged in",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image
        }
    })
}

/**
 * @description Get currently logged in user's details
*/
async function getMeController(req,res) {
    const userId = req.userId
    
    // finds user in database
    const user = await userModel.findById(userId);

    return res.status(200).json({
        message: `User Details`,
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_image: user.profile_image
        }
    });
}

module.exports = {
    registercontroller,
    loginController,
    getMeController
}
