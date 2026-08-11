import { Router } from 'express'
import { identifyUser } from '../middlewares/auth.middleware.js';
import chatController from '../controllers/chat.controller.js';

const chatRouter = Router();

chatRouter.post('/message', identifyUser, chatController.sendMessage)
chatRouter.get('/', identifyUser, chatController.getChat)
chatRouter.get('/:chatId/messages', identifyUser, chatController.getMessages)
chatRouter.delete('/deleteChat/:chatId', identifyUser, chatController.deleteChat)

export default chatRouter;