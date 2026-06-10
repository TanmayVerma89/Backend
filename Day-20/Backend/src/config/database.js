const mongoose = require('mongoose');

// Opens the single MongoDB connection used by the application at startup.
async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to Database");
}

module.exports = connectToDB;
