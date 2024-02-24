const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const Role = require('../models/role');

const profesorPost = async (req, res) => {

    const usuarioAutenticado = req.usuario;

    const {nombre, correo, password} = req.body;

    const role = "TEACHER_ROLE";

    const usuario = new Usuario({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.status(200).json({

        usuario,
        usuarioAutenticado

    });

}

const usuarioPost = async (req, res) => {

    const {nombre, correo, password} = req.body;

    const query = {estado:true};

    const total = await Usuario.countDocuments(query);

    console.log(total);

    if(total == 0){

        const STUDENT_ROLE = new Role({
            role: "STUDENT_ROLE"
        });
      
        const TEACHER_ROLE = new Role({
            role: "TEACHER_ROLE"
        });
      
        await STUDENT_ROLE.save();
        await TEACHER_ROLE.save();

    }

    const usuario = new Usuario({nombre, correo, password});

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.status(200).json({

        usuario

    });

}

const usuariosGet = async (req, res = response) => {

    const {limite,desde} = req.query;

    const query = {estado:true};

    const [total, usuarios] = await Promise.all([

        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        total,
        usuarios,
        usuarioAutenticado
    });

}

const getUsuarioById = async (req, res) => {

    const { id } = req.params;

    const usuario = await Usuario.findOne({_id: id});

    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        usuario,
        usuarioAutenticado
    });

}

const usuarioPut = async (req, res) => {

    const { id } = req.params;

    const { _id, google, ...resto} = req.body;

    await Usuario.findByIdAndUpdate(id, resto);

    const usuario = await Usuario.findOne({_id: id});

    const {password} = req.body;

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password,salt);

    const usuarioAutenticado = req.usuario;

    await usuario.save();

    res.status(200).json({

        msd: 'Usuario Actualizado con exito',
        usuarioAutenticado

    })
}

const usuarioAlumnoPut = async (req, res) => {

    const usuarioAutenticado = req.usuario;

    const id_Alumno = req.usuarioId._id;

    const { _id, role, estado, ...resto} = req.body;

    await Usuario.findByIdAndUpdate(id_Alumno, resto);

    const usuario = await Usuario.findOne({_id: id_Alumno});

    const {password} = req.body;

    const salt = bcryptjs.genSaltSync();

    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();

    res.status(200).json({

        msg: `${usuario.nombre} tus datos fueron actualizados`,
        usuarioAutenticado

    })
}

const usuarioDelete = async (req, res) => {

    const {id} = req.params;

    await Usuario.findByIdAndUpdate(id,{estado:false});

    const usuario = await Usuario.findOne({_id:id});

    const usuarioAutenticado = req.usuario;

    res.status(200).json({

        msg: 'Usuario Eliminado con exito',
        usuario,
        usuarioAutenticado

    });

}

const usuarioAlumnoDelete = async (req, res) => {

    const usuarioAutenticado = req.usuario;

    const id_Alumno = req.usuarioId._id;

    await Usuario.findByIdAndUpdate(id_Alumno,{estado:false});

    const usuario = await Usuario.findOne({_id:id_Alumno});

    res.status(200).json({

        msg: `${usuario.nombre} tu usuario fue eliminado, volver a registrarse si desea volver a usar la aplicación`,
        usuario,
        usuarioAutenticado

    });

}

module.exports = {

    usuarioPost,
    usuariosGet,
    getUsuarioById,
    usuarioPut,
    usuarioDelete,
    profesorPost,
    usuarioAlumnoDelete,
    usuarioAlumnoPut

}