const {registro, loginClient, profileClient} = require('../controller/cliente.controller.js')
const {verificateUser} = require('../middleware/jwt.middleware.js')
const express = require('express')

const route = express()

route.post('/registro', registro)
route.post('/login', loginClient)
route.get('/perfil', verificateUser, profileClient)

module.exports = route