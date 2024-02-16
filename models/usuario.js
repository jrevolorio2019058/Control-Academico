const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },

    password: {
        type:String,
        required: [true, 'La contraseña es obligatorio']
    },

    img: {
        type: String
    },
    
    role: {
        type: String,
        required: true,
        default: "STUDENT_ROLE"
    },
    
    estado: {
        type: Boolean,
        default: true
    }

});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);