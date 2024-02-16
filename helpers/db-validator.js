const Usuario = require('../models/usuario');

const existenteEmail = async (correo = '') => {

    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }

}

module.exports = {
    existenteEmail
}