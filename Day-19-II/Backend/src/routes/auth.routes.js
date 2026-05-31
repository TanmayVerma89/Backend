const express = require('express');
const { registercontroller, loginController, getMeController } = require('../controllers/auth.controller');
const identifyUser = require('../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post('/register', registercontroller)
authRouter.post('/login', loginController)

/**
 * @Route GET api/auth/get-me
 * @description Get currently logged in user details
 * @access Private
*/
authRouter.get('/get-me',identifyUser, getMeController)

module.exports = authRouter;