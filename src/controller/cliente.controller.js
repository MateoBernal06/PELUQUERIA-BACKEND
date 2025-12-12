
const {createClient, findClient, findPhone} = require('../model/cliente.model.js')
const bcrypt = require('bcrypt')
const salt = 12

const registro = async(req, res) => {
    try {
        const { name_client, surname_client, phone, email, password } = req.body;

        //const hash = await bcrypt.hash(password, salt)

        const data = {
            name_client: name_client.trim(),
            surname_client: surname_client.trim(),
            phone: phone.trim(),
            email: email.trim(),
            password: password.trim()
        };

        if(!data.name_client || !data.surname_client || !data.phone || !data.email ||!data.password){
            return res
                .status(400)
                .json({
                    status : false,
                    msg : `Todos los campos son obligatorios`
                })
        }

        const checkEmail = await findClient(data.email)
        if(checkEmail){
            return res
                .status(400)
                .json({
                    status: false,
                    msg: 'El correo ya se encuentra registrado'
                })
        }

        const checkPhone = await findPhone(data.phone)
        if (checkPhone) {
            return res.status(400).json({
                status: false,
                msg: "El numero de celular ya se encuentra registrado",
            });
        }


        if(data.phone.length < 10){
            return res.status(400).json({
                status: false,
                msg: `El numero celular debe tener 10 digitos`,
            });
        }

        if (data.password.length < 8) {
            return res.status(400).json({
                status: false,
                msg: "La contraseña debe contener minimo 8 digitos",
            });
        }

        const result = await createClient(data)
        if(result){
            console.log(result)
        }
        /*data.password = hash*/
        res.status(200).json({
            status : true,
            msg : `Usuario registrado exitosamente`
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            msg: `Server Error`
        });
    }
}


const loginClient = async(req, res) => {
    /*try {
        const {email, password}=req.body

        const data = {
            email : email.trim(),
            password : password.trim()
        }

        if(!data.email || !data.password){
            res.status(400)
                .json({
                    status : true,
                    msg : 'Todos los campos son obligatorios'
                })
        }

        //const result = await loginClient(data)

        if(!result){
            res.status(400)
                .json({
                    status : true,
                    msg : 'Datos incorrectos'
                })
        }

        res.status(200)
            .json({
                status : true,
                result
            })
        
    } catch (error) {
        res.status(500).json({
            status: false,
            msg: `Server Error`,
        });
    }*/
}

module.exports = {
    registro,
    loginClient
}