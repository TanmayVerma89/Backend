# Socket.IO context for GPT

Copy this entire document into GPT when asking for help with Socket.IO in this project. Do not include `.env` values, JWT secrets, database URLs, or API keys.

## Project goal

I have a React + Express AI chat application. I added Socket.IO because I eventually want real-time behaviour, especially streaming an AI response into the UI token-by-token. I want a clear, secure, minimal implementation that works with my existing REST API and cookie-based JWT authentication.

## What my Socket.IO code currently does

**It only opens a persistent client-server connection.**

- The backend creates an HTTP server from Express and attaches a Socket.IO server to it.
- The frontend connects to that Socket.IO server when the dashboard mounts.
- The backend logs the socket ID when a client connects.
- The frontend logs a confirmation when it connects.

There are currently **no custom events** (`socket.on(...)` / `socket.emit(...)`) beyond the built-in `connection` and `connect` events. Therefore, Socket.IO is **not currently involved in sending chat prompts, returning AI responses, updating Redux, or implementing the word-by-word animation**.

## Current architecture

```text
React Dashboard
  ├─ Socket.IO client: opens a connection only
  └─ Axios HTTP requests
       └─ Express REST controller
            ├─ stores user message in MongoDB
            ├─ waits for the AI provider's complete response
            ├─ stores AI message in MongoDB
            └─ returns one JSON response containing both messages
```

The frontend's existing word-by-word effect is a **UI-only animation**. It receives the complete AI response via HTTP, then reveals it word-by-word. It is not AI streaming.

## Relevant current code

### Backend entry point: `Backend/server.js`

```js
import 'dotenv/config';
import app from './src/app.js';
import connectToDB from './src/config/database.js';
import http from 'http'
import { initSocket } from './src/sockets/server.socket.js';

const httpServer = http.createServer(app)

initSocket(httpServer)
connectToDB();

httpServer.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Listen Error:", err);
        return;
    }

    console.log(`Server running on port ${process.env.PORT}`);
});
```

### Socket.IO server: `Backend/src/sockets/server.socket.js`

```js
import { Server } from 'socket.io'

let io;

export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    })

    console.log("Socket.io server is running")

    io.on("connection", (socket) => {
        console.log("User connected: " + socket.id);
    })
}

export function getIO() {
    if (!io) throw new Error("Socket.io not initialized")
    return io
}
```

### Socket.IO client: `Frontend/src/features/chat/services/chat.socket.js`

```js
import { io } from 'socket.io-client';

export function intializeSocketConnection() {
    const socket = io('http://localhost:3000', {
        withCredentials: true,
    });

    socket.on("connect", () => {
        console.log("Connected to Socket.io Server")
    })
}
```

### How the client starts the socket

```js
useEffect(() => {
    intializeSocketConnection();
    handleGetChats();
}, [handleGetChats, intializeSocketConnection]);
```

### Existing REST chat request: `Frontend/src/features/chat/services/chat.api.js`

```js
export async function sendMessage({ message, chatId }) {
    const res = await api.post('/api/chats/message', {
        message,
        chat: chatId
    })
    return res.data
}
```

### Existing REST controller: `Backend/src/controllers/chat.controller.js`

```js
async function sendMessage(req, res) {
    let { message, chat: chatId } = req.body;

    if (!chatId) {
        // Create a chat and generate a title
    } else {
        // Find the existing chat
    }

    await messageModel.create({ chat: chatId, content: message, role: 'user' })

    const messages = await messageModel
        .find({ chat: chatId })
        .sort({ createdAt: 1 });

    const response = await generateResponse(messages)

    const aiMessage = await messageModel.create({
        chat: chatId,
        content: response,
        role: 'AI'
    })

    return res.status(201).json({ chat, userMessage, aiMessage })
}
```

## Socket.IO vs. a normal Express request

| Normal Express/HTTP | Socket.IO |
| --- | --- |
| Client sends one request; server sends one response; the exchange ends. | A connection stays open after setup; either side can send named events at any time. |
| Ideal for CRUD and request/response actions such as login, fetching chats, or deleting a chat. | Ideal for live updates, notifications, presence, typing states, collaborative updates, and AI chunks. |
| The server normally cannot push a new response without the browser polling or opening another request. | The server can push (`emit`) an event to one socket, a room, or all connected clients immediately. |
| Uses Express route handlers such as `app.get` and `router.post`. | Uses event handlers such as `socket.on('event-name', handler)`. |

Socket.IO is not a replacement for Express. It runs alongside Express on the same HTTP server. Many applications use REST for normal CRUD and Socket.IO only for genuinely real-time features.

## Important current limitations to fix before using Socket.IO for chat

1. **No socket reference is returned or stored on the frontend.** The component cannot emit events or listen for app-specific events later.
2. **A new connection can be created when the dashboard mounts again.** The connection should be managed as a singleton and disconnected during cleanup when appropriate.
3. **Sockets are not authenticated.** `withCredentials: true` allows cookies to be sent, but the server currently does not read/verify the JWT during the Socket.IO handshake. REST authentication middleware does not automatically protect Socket.IO events.
4. **There are no rooms.** For private chats, identify the user from the verified socket and put their sockets in a `user:<userId>` room. Never trust a user ID supplied directly from the browser.
5. **The AI service currently returns a complete response.** Socket.IO can emit chunks only if the AI provider/service can produce chunks or tokens incrementally.
6. **Database writes and authorization must remain on the server.** Socket events are not inherently safer than HTTP routes; validate input and verify chat ownership on every event.

## The next implementation I want

Please propose an incremental design that preserves these REST endpoints for chat history and CRUD, but uses Socket.IO only to stream an AI answer.

Desired event flow:

```text
client emits: chat:send { message, chatId? }
server verifies socket JWT and validates input
server creates/fetches an owned chat and stores the user message
server emits: chat:started { chat, userMessage }
server streams AI provider output
server emits repeatedly: chat:chunk { chatId, delta }
server stores the final AI message
server emits: chat:complete { chatId, aiMessage }
on error, server emits: chat:error { message }
```

Please provide:

1. The safest minimal code changes for this event flow.
2. Socket.IO authentication with my existing JWT cookie (`token`) during the handshake.
3. A singleton frontend socket service with connect, disconnect, and event cleanup.
4. Private per-user rooms, and optional chat rooms if useful.
5. How to adapt the AI service so chunks can be emitted without saving partial messages to MongoDB on every token.
6. Error handling, reconnect behaviour, duplicate-event prevention, and when REST is still better.

Use JavaScript ES modules, Express 5, Socket.IO 4, React 19, and Redux Toolkit. Keep the explanation beginner-friendly and do not redesign unrelated parts of the application.
