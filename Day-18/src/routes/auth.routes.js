const express = require('express');
const { registercontroller, loginController } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/register', registercontroller)
authRouter.post('/login', loginController)

module.exports = authRouter;