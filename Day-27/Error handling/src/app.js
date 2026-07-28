import express from "express";
import authRouter from "./routes/auth.routes.js";
import errorhandler from "./middlewares/error.middleware.js";
const app = express();

app.use('/api/auth',authRouter);


app.use(errorhandler)
export default app;