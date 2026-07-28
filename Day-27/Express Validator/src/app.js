import express from 'express'
import authRouter from './routes/authRouter.js';
import {errorHandler} from './middlewares/error.middleware.js'
const app = express();
app.use(express.json())

app.use('/api/auth', authRouter)

app.use(errorHandler)

export default app;
