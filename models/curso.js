const { Schema, model } = require('mongoose');

const CursoSchema = Schema({

    nombreCurso: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio']
    },

    descripcionCurso: {
        type: String,
        required: [true, 'Es necesario poner descripción al curso']
    },

    idProfesor: {
        type: String,
        required: [true, 'Es necesario el id del creador']
    },

    idAlumnos: {
        type: [String],
        default:[]
    },

    estadoCurso: {
        type: Boolean,
        default:true
    }

});

module.exports = model('Curso', CursoSchema);