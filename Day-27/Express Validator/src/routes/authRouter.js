import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { authValidator } from '../validator/auth.validator.js';

const authRouter = Router();

authRouter.post('/register',authValidator, authController.register);

export default authRouter;