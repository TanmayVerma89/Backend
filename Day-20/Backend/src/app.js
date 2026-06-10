const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Central Express app instance that wires middleware and feature routes together.
const app = express();
// Middleware to parse req.body ke data ko read karne ke liye
app.use(express.json());
app.use(cookieParser()); // use middleware to read and set data in cookies

// Allow other urls to access data
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

/* require router */
const authRouter = require("./routes/auth.routes");
const postRouter = require('./routes/post.routes');
const userRoter = require('./routes/user.routes')

// Mount each feature router under its API prefix.
/* Using router*/
app.use('/api/auth',authRouter);
app.use('/api',postRouter);
app.use('/api/users', userRoter);

module.exports = app
