const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Curso = require('../models/curso');

const Usuario = require('../models/usuario')

const cursoPost = async (req, res) => {

    const usuarioAutenticado = req.usuario;

    const { nombreCurso, descripcionCurso } = req.body;
    
    const idProfesor = req.usuarioId._id;

    const curso = new Curso({ nombreCurso, descripcionCurso, idProfesor});

    await curso.save();

    res.status(200).json({

        curso,
        usuarioAutenticado

    });

}

const cursoProfesor = async (req, res = response) => {
    
    const usuarioAutenticado = req.usuario;

    const { limite, desde } = req.query;

    const id_Profesor = req.usuarioId._id;

    const query = { idProfesor: id_Profesor }
    
    const [total, cursos] = await Promise.all([

        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.status(200).json({
        total,
        cursos,
        usuarioAutenticado

    })

}

module.exports = {
    cursoPost,
    cursoProfesor
}