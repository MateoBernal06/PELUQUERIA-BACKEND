const {loginPeluquero, crearPeluquero} =  require('../controller/peluquero.controller.js')
const express = require('express')

const route = express()

route.post('/login', loginPeluquero)
route.post('/registro-barber', crearPeluquero)

module.exports = route