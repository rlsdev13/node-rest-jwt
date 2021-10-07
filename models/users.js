const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name : {
        type : String,
        required : [ true, 'El nombre es requerido' ]
    },
    last_name : {
        type : String,
        required : [ true, 'Los apellidos son requeridos' ]
    },
    date_birth : {
        type : Date,
        required : [ true, 'La fecha de nacimiento es requerida']
    },
    state : {
        type : String,
        required : [ true, 'El estado es requerido']
    },
    date : {
        type : Date,
        default : Date.now
    }

});

userSchema.methods.toJSON = function() {
    const { __v, ...data} = this.toObject();

    return data;
}

module.exports = model( 'User', userSchema );