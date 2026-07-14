const { Router } = require('express');
const authController = require('../controllers/auth.controllers');
const authMiddleware = require('../middlewares/auth.middlewares')
const router = Router(); 

router.post('/register', authController.register);
router.post('/login',authController.login );
router.post('/logout',authMiddleware.identifyUser,authController.logout)
router.get('/get-me',authMiddleware.identifyUser,authController.getMe );

module.exports = router;