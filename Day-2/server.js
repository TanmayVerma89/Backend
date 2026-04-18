const express = require('express');

const app = express() // server instance create karna 

app.get("/", (req, res) => {
    res.send("This is home page")
})

app.get("/contact", (req, res) => {
    res.send("This is contact page")
})

app.get("/about", (req, res) => {
    res.send("This is about page")
})

app.listen(3000) // server start karna
