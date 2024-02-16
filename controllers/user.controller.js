const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuarioPost = async (req, res) => {

    const {nombre, correo, password, role} = req.body;

    const usuario = new Usuario({nombre, correo, password,role});

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.status(200).json({

        usuario

    });

}

module.exports = {

    usuarioPost

}