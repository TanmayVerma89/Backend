import express from "express";
import morgan from "morgan";
import cors from 'cors'
import chatRouter from "./routes/chat.routes.js";

const app = express();
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}))
app.use(express.json());
app.use(morgan("dev"));
app.use('/api',chatRouter)

export default app;
