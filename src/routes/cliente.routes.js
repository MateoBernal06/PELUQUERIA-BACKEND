const {registro, loginClient} = require('../controller/cliente.controller.js')
const express = require('express')

const route = express()

route.post('/registro', registro)
route.post('/login', loginClient)

module.exports = route