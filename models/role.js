const { Schema, model } = require('mongoose');

const roleSchema = Schema({
    role : {
        type : String,
        required : [true, 'El rol es requerido']
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = model( 'Role', roleSchema );