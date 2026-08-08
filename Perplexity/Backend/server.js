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