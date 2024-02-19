const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { existenteEmail, existeUsuarioById, esRolValido} = require('../helpers/db-validator');

const {usuarioPost, usuariosGet, getUsuarioById, usuarioPut, usuarioAlumnoPut, usuarioDelete, usuarioAlumnoDelete, profesorPost} = require('../controllers/user.controller');

const {validarJWT} = require('../middlewares/validar-jwt');

const {tieneRole} = require('../middlewares/validar-roles');

const router = Router();

router.post(

    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6, }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], usuarioPost

);

router.post(

    "/profesor",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6, }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], profesorPost

);

router.get("/", usuariosGet);

router.get(
    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById
);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuarioPut);

router.put(
    "/",
    [
        validarJWT,
        tieneRole('STUDENT_ROLE'),
        validarCampos
    ], usuarioAlumnoPut);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        validarCampos
    ], usuarioDelete);

 router.delete(
    "/",
    [
        validarJWT,
        tieneRole('STUDENT_ROLE'),
        validarCampos
    ], usuarioAlumnoDelete);

module.exports = router;