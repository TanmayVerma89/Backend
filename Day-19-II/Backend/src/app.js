const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

/* require router */
const authRouter = require("./routes/auth.routes");
const postRouter = require('./routes/post.routes');
const userRoter = require('./routes/user.routes')

/* Using router*/
app.use('/api/auth',authRouter);
app.use('/api',postRouter);
app.use('/api/users', userRoter);

module.exports = app