const {createClient, findClient,findPhone, login} = require("../model/cliente.model.js");
const bcrypt = require("bcrypt");

const registro = async (req, res) => {
    try {
        const { name_client, surname_client, phone, email, password } = req.body;

        // permite general palabras aleatorias que se colocaran en el hash, evitando que el hash 
        // se repita en el caso de que varios usuarios posean la misma contraseña
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const data = {
            name_client: name_client.trim(),
            surname_client: surname_client.trim(),
            phone: phone.trim(),
            email: email.trim(),
            password: password.trim(),
        };

        if (!data.name_client || !data.surname_client || !data.phone || !data.email || !data.password) {
            return res.status(400).json({
                ok: false,
                msg: `Todos los campos son obligatorios`,
            });
        }

        const checkEmail = await findClient(data.email);
        if (checkEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya se encuentra registrado",
            });
        }

        const checkPhone = await findPhone(data.phone);
        if (checkPhone) {
            return res.status(400).json({
                ok: false,
                msg: "El numero de celular ya se encuentra registrado",
            });
        }

        if (data.phone.length!=10) {
            return res.status(400).json({
                ok: false,
                msg: "El numero celular debe tener 10 digitos",
            });
        }

        if (data.password.length<8 || data.password.length>15) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña debe contener de 8 a 15 caracteres",
            });
        }

        data.password = hash
        await createClient(data);
        
        res.status(200).json({
            ok: true,
            msg: "Usuario registrado exitosamente",
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Server Error`,
        });
    }
};

const loginClient = async (req, res) => {
    try {
        const {email, password}=req.body

        const data = {
            email : email.trim(),
            password : password.trim()
        }

        if(!data.email || !data.password){
            res.status(400)
                .json({
                    ok: false,
                    msg: 'Todos los campos son obligatorios'
                })
        }

        const result = await login(data)

        if(!result){
            res.status(400)
                .json({
                    ok: false,
                    msg: 'Datos incorrectos'
                })
        }

        res.status(200)
            .json({
                ok : true,
                result
            })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: `Server Error`
        });
    }
};

module.exports = {
    registro,
    loginClient,
};
