const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {cursoPost, cursoGetProfesor, cursoPutProfesor, cursoDelete, cursoPutAlumno} = require('../controllers/curso.controller');

const {validarJWT} = require('../middlewares/validar-jwt');

const {tieneRole} = require('../middlewares/validar-roles');

const router = Router();

router.post(

    "/",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("nombreCurso", "Es necesario un nombre de curso").not().isEmpty(),
        check("descripcionCurso", "Es necesaria la descripcion del curso").not().isEmpty(),
        validarCampos
    ],cursoPost

);

router.get(
    "/",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE')
    ],cursoGetProfesor
);

router.put(

    "alumno/:id",
    [

        validarJWT,
        tieneRole('STUDENT_ROLE'),
        check("nombreCurso", "Es necesario un nombre de curso").not().isEmpty(),
        validarCampos

    ], cursoPutAlumno

);

router.put(
    "profesor/:id",
    [

        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("nombreCurso", "Es necesario un nombre de curso").not().isEmpty(),
        check("descripcionCurso", "Es necesaria la descripcion del curso").not().isEmpty(),
        validarCampos
    ], cursoPutProfesor
);

router.delete(

    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        validarCampos
    ],cursoDelete
);

module.exports = router;