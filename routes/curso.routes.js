const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {cursoPost} = require('../controllers/curso.controller');

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

module.exports = router;