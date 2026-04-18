/**
- server create karna
- server ko configure karna
 */

const express = require('express');
const app = express();
app.use(express.json())

const notes = []

app.get('/notes', (req, res) => {
    res.send(notes);
})

app.post('/notes', (req, res) => {
    notes.push(req.body)
    console.log(notes);

    res.send("Note created")
})


// Delete api
app.delete('/notes/:index', (req, res) => {
    delete notes[req.params.index]
    res.send("Note deleted successfully")
})

// Patch /notes/:index 
app.patch('/notes/:index',(req,res) => {
    notes[req.params.index].description = req.body.description
    res.send('Note updated successfully')
})

module.exports = app;