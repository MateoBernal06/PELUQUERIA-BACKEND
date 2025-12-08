const {registro} = require('../controller/cliente.controller.js')
const express = require('express')

const route = express()

route.post('/registro', registro)

module.exports = route