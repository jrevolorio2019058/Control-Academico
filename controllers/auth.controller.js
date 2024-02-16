const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario");
const bycriptjs = require('bcryptjs');

const login = async (req, res) => {

    const {correo, password} = req.body;

    try{
        
        const usuario = await Usuario.findOne({ correo });

        console.log(usuario)

        if(!usuario){
            return res.status(400).json({
                msg: 'El correo no esta registrado'
            })
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usuario no es existente en la base de datos'
            })
        }

        const validPassword = bycriptjs.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            })
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'Logeado Correctamente',
            usuario,
            token
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: 'Error!, Comuniquese con el administrador'
        })
    }

}

module.exports = {
    login
};