const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req, res, next) => {

  const token = req.header("x-token");

  if (!token) {

    return res.status(401).json({

      msg: "En la petición no hay token",
    });
  }

  try {

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {

      return res.status(401).json({

        msg: "Usuario no existente en base de datos",
      
    });

    }

    if (!usuario.estado) {

      return res.status(401).json({

        msg: "Token Denegado | usuario con estado falso",

      });

    }

    req.usuario = usuario;
    req.usuarioId = await Usuario.findById(uid);

    next();

  } catch (e) {

    console.log(e),

      res.status(401).json({

        msg: "Token no válido",

      });

  }

};

module.exports = {

  validarJWT,
  
};