import { intializeSocketConnection } from "../services/chat.socket";

export const useChat = () => {
    return {
        intializeSocketConnection,
    }
}