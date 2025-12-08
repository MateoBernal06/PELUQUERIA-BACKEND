const connection = require("../config/database.js");
require('colors')

const createClient = async (data) => {
    try {
        const {nombres, apellidos, celular, email, password} = data
        const mysql =
            `INSERT INTO Cliente (nombres, apellidos, celular, email, password) 
            values(?, ?, ?, ?, ?)`;
        
        const values = [nombres, apellidos, celular, email, password];
        const [result, fields] = await connection.execute(mysql, values);
        console.log(result)
        console.log(fields)

    } catch (error) {
        console.log(`Error inesperado: ${error.message}`);
    }
}

module.exports = {
    createClient
};