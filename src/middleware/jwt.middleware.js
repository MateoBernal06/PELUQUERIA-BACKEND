require('dotenv').config()
const jwt = require('jsonwebtoken')

const verificateUser = (req, res, next) =>{
    
    //1. Obtencion del token
    let token = req.headers.authorization

    //2. Verificacion si ingreso algun token
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Token no proporcionado'
        })
    }

    //3. Desestructuracion de token (El token viene del siguiente 
    // forma: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI)
    token = token.split(" ")[1]

    try {
        const { id_client } = jwt.verify(token, process.env.JWT_SECRET);
        req.id_client = id_client
        next()

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Token invalido'
        })
    }
} 


module.exports = {verificateUser}