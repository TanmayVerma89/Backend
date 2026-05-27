const express = require('express');
const { registercontroller, loginController } = require('../controllers/auth.controller');
const userRouter = express.Router();

userRouter.post('/register', registercontroller)
userRouter.post('/login', loginController)

module.exports = userRouter;