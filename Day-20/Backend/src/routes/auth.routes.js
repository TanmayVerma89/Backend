const express = require('express');
const identifyUser = require("../middlewares/auth.middleware")
const { registercontroller, loginController, getMeController } = require('../controllers/auth.controller');
const authRouter = express.Router();

// Authentication routes cover signup, login, and fetching the current session user.
/**
 * @Route POST api/auth/register
 * @description Creates New user in database
*/
authRouter.post('/register', registercontroller);

/**
 * @Route POST api/auth/login
 * @description Login user
*/
authRouter.post('/login', loginController)

/**
 * @Route GET api/auth/get-me
 * @description Get currently logged in user details
 * @access Private
*/
// This private route expects auth middleware to populate the request user details first.
authRouter.get('/get-me',identifyUser, getMeController)

module.exports = authRouter;
