const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/user.routes");
const postRouter = require('./routes/post.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',userRouter);
app.use('/api',postRouter);

module.exports = app