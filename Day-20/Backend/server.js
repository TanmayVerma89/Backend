// Load environment variables before importing modules that depend on them.
require('dotenv').config()
const app = require('./src/app');
const connectToDB = require('./src/config/database');

// Establish the database connection before the app starts serving requests.
connectToDB();

// Start the HTTP server on the project's local development port.
app.listen(3000,() => {
    console.log('Server is running on port 3000');
})
