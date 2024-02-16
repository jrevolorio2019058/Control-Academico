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

const cursoGetProfesor = async (req, res = response) => {
    
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

const cursoPutProfesor = async (req, res = response) => {

    const usuarioAutenticado = req.usuario;

    const { id } = req.params;

    const { _id, idProfesor, ...resto } = req.body;

    await Curso.findByIdAndUpdate(id, resto);

    const curso = await Curso.findOne({ _id: id });
    
    await curso.save();

    res.status(200).json({

        msd: 'Curso Actualizado con exito',
        usuarioAutenticado

    })

}

module.exports = {
    cursoPost,
    cursoGetProfesor,
    cursoPutProfesor
}