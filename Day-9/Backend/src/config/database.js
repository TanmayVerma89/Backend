const mongoose = require('mongoose');
function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((e) => {
        console.log(e.message);
    })
}
module.exports = connectToDB;