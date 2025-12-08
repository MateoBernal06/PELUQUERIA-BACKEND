
const mysql = require('mysql2/promise')
require('colors')

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "Peluqueria",
    password: "123456",
});

connection.getConnection()
    .then(() => console.log(`Conexion exitosa!`.bgGreen))
    .catch((error)=>console.log(`Error inesperado: ${error.message}`.bgRed))

module.exports = connection

