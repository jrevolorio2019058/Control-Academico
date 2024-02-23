const Usuario = require('../models/usuario');

const Role = require('../models/role');

const Curso = require('../models/curso');

const existenteEmail = async (correo='') => {

    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }

}

const yaEstaEnCurso = async (idAlumnos='') => {
    
    const existeAlumno = await Curso.findOne({ idAlumnos });
    
    if (existeAlumno) {
        throw new Error(`El Alumno ${idAlumnos} ya fue registrado`);
    }

}

const existeUsuarioById = async (id='') => {

    const existeUsuario = await Usuario.findOne({id});

    if(existeUsuario){
        throw new Error(`Status | id:$(id) | No existe`)
    }

}

const esRolValido = async (role='') => {

    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`Status | Role:${ role } | No existe en la base de datos`)
    }

}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido,
    yaEstaEnCurso
}