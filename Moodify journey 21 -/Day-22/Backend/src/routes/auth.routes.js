const {Router} = require('express');
const authController = require('../controllers/auth.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

Router.post('/register',authController.registerUser)
Router.post('/login',authController.loginUser)
Router.post('/get-me',authMiddleware.identifyUser,authController.getMe)


module.exports = Router;