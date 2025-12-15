const connection = require("../database/connetion.database.js");
require('colors')
const bcrypt = require('bcrypt')

const createClient = async (data) => {
    try {
        //1. Descestructuracion de datos
        const { name_client, surname_client, phone, email, password } = data;

        // 2. Creacion de query
        //? Consultas parametrisadas con el fin de evitar inyecciones SQL
        const mysql = ` INSERT INTO Cliente (name_client, surname_client, phone, email, password)
                        VALUES (?, ?, ?, ?, ?)`;
        
        // 3. Valores a ingresar a la base de datos
        const values = [name_client, surname_client, phone, email, password];
        const [result, fields] = await connection.execute(mysql, values);
        return result
        
    } catch (error) {
        console.log(`Error inesperado: ${error.message}`);
    }
}


const login = async(data) => {
    try {
        const { email, password } = data;
        const mysql = `SELECT * FROM Cliente WHERE email=?`;
        const values = [email]
        const [result, fields] = await connection.execute(mysql, values);
        const verificate = await bcrypt.compare(password, result[0].password);
        
        if(verificate){
            const { id_client, name_client, surname_client, phone, email, date_register} = result[0];
            const data = {
                id_client,
                name_client,
                surname_client,
                phone,
                email,
                date_register,
            };
            return data
        }
        
        return false
        
    } catch (error) {
        console.log(`Errorr inesperado: ${error.message}`)
    }
}

const findClient = async(data) =>{
    try {
        const email = data
        const mysql = `SELECT * FROM Cliente WHERE email=?`;
        const values = [email]
        const [result, fields] = await connection.execute(mysql, values);
        return result[0]

    } catch (error) {
        console.log(`Error inesperado: ${error.message}`)
    }
}


const findPhone = async (data) => {
    try {
        const phone = data;
        const mysql = `SELECT * FROM Cliente WHERE phone=?`;
        const values = [phone]
        const [result, fields] = await connection.execute(mysql, values);
        return result[0];

    } catch (error) {
        console.log(`Error inesperado: ${error.message}`);
    }
};

module.exports = {
    createClient,
    findClient,
    findPhone,
    login
};



