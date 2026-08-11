import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null
    },
    reducers: {
        createNewChat: (state, action) => {
            const { title, chatId } = action.payload;
            const existingChat = state.chats[chatId];

            if (existingChat) {
                existingChat.title = title || existingChat.title;
                existingChat.lastUpdated = new Date().toUTCString();
                return;
            }

            state.chats[chatId] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toUTCString()
            }
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role, messageId } = action.payload;
            state.chats[chatId].messages.push({ _id: messageId, content, role })
        },
        setChatMessages: (state,action) => {
          const {chatId , messages} = action.payload;
          state.chats[chatId].messages = messages  
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
    }
})

export const { setChats, setCurrentChatId, setIsLoading, setError, createNewChat, addNewMessage, setChatMessages } = chatSlice.actions
export default chatSlice.reducer;
