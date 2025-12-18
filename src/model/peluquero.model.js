const connection = require("../database/connetion.database.js");
const bcrypt = require("bcrypt");

const login = async (data) => {
    try {
        const { email, password } = data;
        const mysql = `SELECT * FROM Peluquero WHERE email=?`;
        const values = [email];
        const [result, fields] = await connection.execute(mysql, values);
        const verificate = await bcrypt.compare(password, result[0].password)
        
        if(verificate){
            const { id_barber, name_barber, phone_barber, email, date_register, exp_time, available } = result[0];
            const data = {
                id_barber,
                name_barber,
                phone_barber,
                email,
                date_register,
                exp_time,
                available
            };
            return data
        }

        return false

    } catch (error) {
        console.log(`Error inesperado: ${error.message}`);
    }
};

const registrerBarber = async(data) =>{
    try {
        const { name_barber, phone_barber, email, password, exp_time } = data;
        const mysql =
            `INSERT INTO Peluquero(name_barber, phone_barber, email, password, exp_time)
            VALUES (?, ?, ?, ?, ?)`
        const values = [name_barber, phone_barber, email, password, exp_time]
        const [result, fields]= await connection.execute(mysql, values)
        return true

    } catch (error) {
        console.log(`Error inesperado: ${error.message}`);
    }
}

const verificateEmail = async(data) =>{
    try {
        const email = data
        const mysql = `SELECT * FROM Peluquero WHERE email=?`
        const values = [email]
        const [result, fields] = await connection.execute(mysql, values)
        if(result[0]){
            return true
        }

    } catch (error) {
        console.log(`Error inesperado: ${error.message}`);
    }
}

const verificatePhone = async(data) =>{
    try {
        const phone = data
        const mysql = `SELECT id_barber FROM Peluquero WHERE phone_barber=?`
        const values = [phone]
        const [result, fields] = await connection.execute(mysql, values)
        if (result[0]) {
            return true;
        }

    } catch (error) {
        console.log(`Error inesperado: ${error.message}`);
    }
}


module.exports = {
    login, verificateEmail, registrerBarber, verificatePhone
};
