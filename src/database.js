
const mysql = require('mysql2/promise')
require('colors')

const dataBase = async () => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "Peluqueria",
        password: "123456",
    });
    
    try {
        if(connection){
            console.log(`Conexion exitosa!`.bgGreen)
        }

    } catch (error) {
        console.log(`Error inesperado: ${error.message}`.bgRed);
    }
}


module.exports = dataBase