import { intializeSocketConnection } from "../services/chat.socket";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getChats, getMessages, sendMessage } from "../services/chat.api";
import { createNewChat, addNewMessage, setChats, setCurrentChatId, setIsLoading, setChatMessages } from "../chat.slice";

export const useChat = () => {
    const dispatch = useDispatch();

    const handleSendMessage = useCallback(async ({ message, chatId }) => {
        dispatch(setIsLoading(true))
        const data = await sendMessage({ message, chatId });
        const { aiMessage, chat, userMessage } = data
        dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: message,
            role: "user",
            messageId: userMessage._id
        }))
        dispatch(addNewMessage({
            chatId: chat._id,
            content: aiMessage.content,
            role: aiMessage.role,
            messageId: aiMessage._id
        }))
        dispatch(setCurrentChatId(chat._id))
        dispatch(setIsLoading(false))
    }, [dispatch])

    const handleGetChats = useCallback(async () => {
        dispatch(setIsLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updatedAt
            }
            return acc
        }, {})));
        dispatch(setIsLoading(false))
    }, [dispatch])

    const hangleGetMessages = useCallback(async ({ chatId }) => {
        dispatch(setIsLoading(true));
        const data = await getMessages({ chatId })
        const {messages} = data;
        dispatch(setChatMessages({chatId ,messages}))
        dispatch(setIsLoading(false))
    }, [dispatch])

    return {
        intializeSocketConnection,
        handleGetChats,
        handleSendMessage,
        hangleGetMessages
    }
}
