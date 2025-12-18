const bcrypt = require("bcrypt");
const {login, verificateEmail, registrerBarber, verificatePhone} = require('../model/peluquero.model.js')

const loginPeluquero = async (req, res) => {
    try {
        const { email, password } = req.body;
        bcrypt.genSalt();
        const data = {
            email: email.trim(),
            password: password.trim(),
        };

        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                msg: "Todos los campos son obligatorios",
            });
        }

        const checkEmail = await verificateEmail(data.email)
        if (!checkEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo no esta registrado",
            });
        }

        const result = await login(data)

        if(!result){
            return res.status(400).json({
                ok: false,
                msg: 'Datos incorrectos'
            })
        }
        
        res.status(200).json({
            ok: true,
            data: result
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Server Error`,
        });
    }
};


const crearPeluquero = async(req, res) => {
    try {
        const {name_barber, phone_barber, email, password, exp_time} = req.body
        const salt = await bcrypt.genSalt(10)
                
        const data = {
            name_barber: name_barber.trim(),
            phone_barber: phone_barber.trim(),
            email: email.trim(),
            password: password.trim(),
            exp_time: exp_time
        }

        if(!data.name_barber || !data.phone_barber || !data.email || !data.password || !data.exp_time){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos obligatorios'
            })
        }

        if(data.phone_barber.length!=10){
            return res.status(400).json({
                ok: false,
                msg: "El numero celular debe tener 10 digitos",
            });
        }

        const phoneVerificate = await verificatePhone(data.phone_barber)
        if(phoneVerificate){
            return res.status(400).json({
                ok: false,
                msg: 'El numero de celular ya se encuentra registrado'
            })
        }

        const hash = await bcrypt.hash(data.password, salt);
        data.password = hash
        
        const emailVerificate = await verificateEmail(data.email)
        if(emailVerificate){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya se encuentra registrado'
            })
        }

        if (data.password.length <= 8 && data.password.length >= 15) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña debe contener de 8 a 15 caracteres"
            });
        }

        const result = await registrerBarber(data)
        if(!result){
            return res.status(400).json({
                ok: false,
                msg: 'Se produjo un error al intentar crear al usuario'
            })
        }

        res.status(200).json({
            ok: true,
            msg: 'Usuario registrado exitosamente'
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Server Error'
        })
        console.log(error)
    }
}


module.exports = {
    loginPeluquero,
    crearPeluquero
};




