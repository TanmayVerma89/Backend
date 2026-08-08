import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { generateChatTitle, generateResponse } from "../services/ai.service.js";

async function sendMessage(req, res) {

    let { message, chat: chatId } = req.body;

    let title = null, chat = null;

    if (!chatId) {

        title = await generateChatTitle(message)
        chat = await chatModel.create({
            user: req.userId,
            title
        })
        chatId = chat._id;
    } else {
        chat = await chatModel.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }
    }

    const userMessage = await messageModel.create({
        chat: chatId,
        content: message,
        role: 'user'
    })

    const messages = await messageModel
        .find({ chat: chatId })
        .sort({ createdAt: 1 });

    const response = await generateResponse(messages)

    const aiMessage = await messageModel.create({
        chat: chatId,
        content: response,
        role: 'AI'
    })

    return res.status(201).json({
        chat,
        userMessage,
        aiMessage,
    });
}

async function getChat(req, res) {

    const chat = await chatModel.find({ user: req.userId }).sort({ createdAt: 1 });

    return res.status(200).json({
        message: `User chats`,
        chat
    });
}

async function getMessages(req, res) {
    const { chatId } = req.params; 

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.userId
    });
    console.log(chat)
    if (chat.user != req.userId) {
        return res.status(404).json({
            message: `Chat not found`,
        });
    }

    const messages = await messageModel.find({chat:chatId});
    return res.status(200).json({
        message: `chat messages`,
        messages
    });
}

export default {
    sendMessage,
    getChat,
    getMessages
}