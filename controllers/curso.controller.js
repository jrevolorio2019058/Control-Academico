const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Curso = require('../models/curso');

const Usuario = require('../models/usuario');

const cursoPost = async (req, res) => {

    usuarioAutenticado = req.usuario;

    const { nombreCurso, descripcionCurso } = req.body;
    
    const idProfesor = req.usuarioId._id;

    console.log(idProfesor);

    const curso = new Curso({ nombreCurso, descripcionCurso, idProfesor});

    await curso.save();

    res.status(200).json({

        curso,
        usuarioAutenticado

    });

}

module.exports = {
    cursoPost
}