const express = require('express');
const connect = require('./db')
var cors = require('cors')

const app = express()
const port = 5000

connect()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World!")
})
app.use('/api/student', require('./routes/stud'))

app.listen(port, (req, res) => {
    console.log(`The website is listining to port ${port}`)
})
