// server create karna

const express = require('express');
// CORS (Cross-Origin Resource Sharing) ek security feature hai jo web browsers mein implement hota hai. Ye feature web applications ko allow karta hai ki wo resources ko access kar sakein jo unke origin (domain) se alag hote hain. CORS ke through, server specify kar sakta hai ki kaunse origins ko access allow hai, kaunse HTTP methods allowed hain, aur kaunse headers allowed hain. Isse web applications ko secure banaya jata hai aur unauthorized access se bachaya jata hai. 

const cors = require('cors'); 

const noteModel = require('./models/notes.model');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());
// Static files serve karne ke liye middleware use karna
app.use(express.static("./public"))



app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;
    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Get Notes successfully",
        notes
    })
})

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.put('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;
    await noteModel.findByIdAndUpdate(id, { description })
    res.status(200).json({
        message: "Note updated successfully"
    })
})

// React app ke liye fallback route set karna, taki jab user kisi bhi route par jaye to index.html serve ho jaye aur React app handle kar sake routing ko.
app.use('*name',(req,res) => {
    res.sendFile(path.dirname, '..', '/public/index.html')
}) 

module.exports = app
