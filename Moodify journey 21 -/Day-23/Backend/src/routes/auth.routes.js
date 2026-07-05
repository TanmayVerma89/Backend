const express = require('express');
const authRouter = express.Router()
const authController = require("../controllers/auth.controllers")
const authMiddleware = require("../middlewares/auth.middleware")

authRouter.post('/login',authController.login);
authRouter.post('/register',authController.register);
authRouter.get('/get-me',authMiddleware.identifyUser,authController.getMe);
authRouter.post('/logout',authController.logout)

module.exports = authRouter;