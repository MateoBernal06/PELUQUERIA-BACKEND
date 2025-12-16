
const jwt = require('jsonwebtoken')

const varifacate = (req, res, next) =>{
    try {
        const token = req.headers.authorization

    } catch (error) {
        console.log(`Error inesperado: ${error.message}`);
    }
} 