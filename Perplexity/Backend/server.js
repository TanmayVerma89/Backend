import dotenv from 'dotenv'
dotenv.config()

import app from './src/app.js';
import connectToDB from './src/config/database.js';

connectToDB();

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log("Listen Error:", err);
        return;
    }

    console.log(`Server running on port ${process.env.PORT}`);
});