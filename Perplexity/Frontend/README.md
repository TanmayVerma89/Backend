# Perplexity Frontend

A React single-page chat application where authenticated users can create, revisit, and continue AI conversations.

## Tech stack

| Area | Technology | Purpose |
| --- | --- | --- |
| UI | React 19 + Vite | Component-based interface and development/build tooling |
| Routing | React Router | Login, registration, and protected dashboard routes |
| State | Redux Toolkit + React Redux | Authentication state and in-memory chat state |
| HTTP | Axios | Cookie-enabled communication with the backend API |
| Realtime | Socket.IO Client | Opens the application's socket connection on the dashboard |
| AI response display | react-markdown | Renders assistant responses as safe Markdown elements |
| Styling | CSS, SCSS, Tailwind CSS | Responsive auth and chat interface styling |

## Run locally

```bash
npm install
npm run dev
```

The frontend expects the backend server at `http://localhost:3000`. Requests are sent with credentials, so start the backend and configure its CORS/cookie settings for the Vite app's origin.

## Application flow

```text
App mounts
  -> fetch current user (/api/auth/me)
  -> auth loading screen while the request is pending
  -> no user: login or register routes
  -> user: protected dashboard

Dashboard mounts
  -> open Socket.IO connection
  -> fetch chat list
  -> select a chat -> fetch its messages
  -> send prompt -> show pending message + typing state
  -> receive AI response -> update Redux chat state -> render Markdown response
```

## Route behaviour

| Route | Screen | Access |
| --- | --- | --- |
| `/login` | Sign-in form | Public |
| `/register` | Account creation form | Public |
| `/dashboard` | Chat workspace | Protected; redirects to `/login` when unauthenticated |

## Frontend structure

```text
src/
├── app/                 # Router, Redux store, global styles
├── features/
│   ├── auth/            # Auth forms, route guard, loading state, API hook
│   └── chat/            # Dashboard, sidebar, chat state, API/socket hooks
└── main.jsx             # React + Redux application entry point
```

## Chat state flow

`useChat` calls the chat API and dispatches actions to `chat.slice.js`. Chats are stored by chat ID, while `currentChatId` determines which conversation the dashboard displays. Sending a prompt includes the selected chat ID, allowing the backend to append to that conversation; a missing ID creates a new conversation. Assistant messages are rendered with `react-markdown`, and only newly received replies use the writing animation.
