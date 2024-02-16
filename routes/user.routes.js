const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { existenteEmail, existeUsuarioById} = require('../helpers/db-validator');

const {usuarioPost, usuariosGet, getUsuarioById} = require('../controllers/user.controller');

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

router.get("/", usuariosGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById
);

module.exports = router;