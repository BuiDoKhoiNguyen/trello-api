const express = require('express')

const app = express()

const port = 8017

app.get('/', function (req, res) {
    res.send('<h1>Hello World Nodejs </h1>')
})

app.listen(port, () => {
    console.log(`hello, i'm running server at http://localhost:${port}/`)
})
