
const {createClient} = require('../model/cliente.model.js')

const registro = async(req, res) => {
    try {
        const { nombres, apellidos, celular, email, password } = req.body;
        
        const data = {
            nombres: nombres.trim(),
            apellidos: apellidos.trim(),
            celular: celular.trim(),
            email: email.trim(),
            password: password.trim(),
        };

        if(!data.nombres || !data.apellidos || !data.celular || !data.email ||!data.password){
            res
                .status(400)
                .json({
                    status : true,
                    msg : `Todos los campos son obligatorios`
                })
        }

        if(data.celular.length < 10){
            res.status(400).json({
                status: true,
                msg: `El numero celular debe tener 10 digitos`,
            });
        }

        await createClient(data)
        res.status(200).json({
            status : true,
            msg : `Usuario registrado exitosamente`
        })

    } catch (error) {
        res.status(404).json({
            status: false,
            msg: `Se produjo un error: ${error.message}`
        });
    }
}

module.exports = {
    registro
}