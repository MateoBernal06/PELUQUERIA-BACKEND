const {registro, login} = require('../controller/cliente.controller.js')
const express = require('express')

const route = express()

route.post('/registro', registro)
route.post('/login', login)

module.exports = route