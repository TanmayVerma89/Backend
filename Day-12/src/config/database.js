const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database is connected");
        })
}

module.exports = connectToDB;