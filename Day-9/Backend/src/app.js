// server create karna

const express = require('express');
const cors = require('cors');
const noteModel = require('./models/notes.model');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());
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

app.use('*name',(req,res) => {
    res.sendFile(path.join(__dirname,"..", "./public/index.html"))
})

module.exports = app
