const mongoose = require('mongoose');
const app = require('./src/app')

function connectToDB(){
    mongoose.connect("mongodb+srv://tanmayverma566_db_user:9310119789@cluster0.pllwnut.mongodb.net/Day-6")
    .then(() => {
        console.log("Database is connected");  
    })
    .catch((err) => {
        console.log("DB connection error:", err.message);
    });
};

connectToDB()

app.listen(3000,() => {
    console.log('Server is running on port 3000');
})