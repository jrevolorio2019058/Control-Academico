const {Schema, model} = require('mongoose');

const RolesSchema = Schema ({

    role:{
        type:String,
        required: [true, "El nombre del role es obligatorio"]
    }

});

module.exports = model("Role", RolesSchema);