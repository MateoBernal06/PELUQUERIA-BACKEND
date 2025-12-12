const { text } = require("express");
const connection = require("../database/connetion.database.js");
require('colors')
const bcrypt = require('bcrypt')

const createClient = async (data) => {
    try {
        //1. Descestructuracion de datos
        const { name_client, surname_client, phone, email, password } = data;
    
        // 2. Creacion de query
        //? Consultas parametrisadas con el fin de evitar inyecciones SQL
        const query = {
            text: `
                    INSERT INTO Cliente (name_client, surname_client, phone, email, password)
                    VALUES (?, ?, ?, ?, ?)
                `,
            values: [name_client, surname_client, phone, email, password],
        };
    
        const [result, fields] = await connection.execute(
            query.text,
            query.values
        );
        return result
        
    } catch (error) {
        console.log(`Error inesperado: ${error.message}`);
    }
}

const findClient = async(data) =>{
    try {
        const email = data
        const query = {
            text: `
                SELECT * FROM Cliente WHERE email=?
            `,
            values: [email]
        }
        
        const [result, fields] = await connection.execute(query.text, query.values);
        return result[0]

    } catch (error) {
        console.log(`Error inesperado: ${error.message}`)
    }
}


const findPhone = async (data) => {
    try {
        const phone = data;
        const query = {
        text: `
                    SELECT * FROM Cliente WHERE phone=?
                `,
        values: [phone],
        };

        const [result, fields] = await connection.execute(query.text, query.values);
        return result[0];
    } catch (error) {
        console.log(`Error inesperado: ${error.message}`);
    }
};

module.exports = {
    createClient,
    findClient,
    findPhone
};



