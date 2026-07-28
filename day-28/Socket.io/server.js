import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./src/app.js";

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
  console.log("new connection created")

  socket.on('message',(message) => {
    console.log("user fired message event")
    console.log(message)
  })
});

httpServer.listen(3000,() => {
    console.log('Server is running on port 3000');
});