const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

/* require routes */
const authRouter = require("./routes/auth.routes");
const postRouter = require('./routes/post.routes');
const userRoter = require('./routes/user.routes')

/* Using routes*/
app.use('/api/auth',authRouter);
app.use('/api',postRouter);
app.use('/api/users', userRoter);

module.exports = app