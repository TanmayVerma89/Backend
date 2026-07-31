import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import {loginValidator, registerValidator} from '../validators/auth.validator.js';
import { identifyUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post('/register', registerValidator, authController.register);
authRouter.post('/login',loginValidator , authController.login)
authRouter.get('/verify-email', authController.verifyEmail)
authRouter.get('/get-me',identifyUser, authController.getMe)


export default authRouter;
