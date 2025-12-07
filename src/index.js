const express = require('express')
const morgan = require('morgan')
const dataBase = require("./database.js");
require('dotenv').config()

const app = express()
const PORT = process.env.PORT
app.use(morgan('dev'))
app.use(express.json())
dataBase()

app.get('/', (req, res)=>{
    res.status(200).send('Server OK')
})

app.use((req, res, next)=>{
    res.status(404).send('Not Found 404')
    next()
})

app.listen(PORT, ()=>{
    console.log(`Server on Port ${PORT}`)
})

