const { request, response } = require('express');

const tieneRole = (...roles) => {

    return (req = request, res = response, next) =>{

        if(!req.usuario){

            return res
                .status(500)
                .json({

                    msg: 'Se quiere verificar un role sin validar el token primero',

                });

        }

        if(!roles.includes(req.usuario.role)){

            return res
            .status(401)
            .json({

                msg: `El servicio requiere uno de los siguientes roles autorizados ${roles}`,
            
            });

        }

        next();

    };

};

module.exports = {

    tieneRole

}