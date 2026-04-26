const express = require('express');
const app = express();

app.use(express.json( ))

const notes = [];

// Create new note
app.get('/notes', (req, res) => {
    res.status(200).json({
        Notes : notes,
        message : 'Note received successfully'
    })
})

// 
app.post('/notes', (req, res) => {
    notes.push(req.body)
    console.log(req.body);
    
    res.status(201).json({
        message : 'Note created successfully'
    })
})

app.delete('/notes/:index',(req,res) => {
    delete notes[req.params.index]
    res.status(204).json({
        message : 'Note deleted successfully'
    })
})

module.exports = app;