const express = require('express');
const noteModel = require('./models/note.model');
const app = express();

app.use(express.json())

app.post('/notes', async (req, res) => {
    const { title, description } = req.body;

    const note = await noteModel.create({
        title, description
    })

    res.status(201).json({
        message: "Note created successfully",
        note
    })
    console.log('done');
})

app.get('/notes',async (req,res) => {
    const notes = await noteModel.find();

    res.status(200).json({
        message: "Fetch notes successfully",
        notes
    })
})

module.exports = app