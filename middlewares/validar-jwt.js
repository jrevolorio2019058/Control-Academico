const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const Curso = require("../models/curso");

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

const validarJWTProfesor = (... idProfesor) => {

    return (req = request, res = response, next) =>{

        if(!req.usuario){

            return res
                .status(500)
                .json({

                    msg: 'Se quiere verificar un role sin validar el token primero',

                });

        }

        if(idProfesor != req.usuarioId){

            return res
            .status(401)
            .json({

                msg: `El profesor ${req.usuario.nombre} no puede actualizar el curso`,
            
            });

        }

        next();

    };

};

module.exports = {

  validarJWT,
  validarJWTProfesor,
  
};