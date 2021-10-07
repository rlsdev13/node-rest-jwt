const { Schema, model } = require('mongoose');

const credentialSchema = Schema({
    email : {
        type : String,
        required : [ true, 'El correo es requerido'],
        trim : true,
        unique : true,
        regExp : /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    password : {
        type : String,
        required : [ true, 'La contraseña es requerida'],
        trim : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : [ true, 'El usuario es requerido']
    },
    role : {
        type : String,
        required : [ true, 'El rol es requerido'],
        default : "USER_ROLE"
    },
    verified : {
        type : Boolean,
        required : true,
        default : false
    },
    deleted : {
        type : Boolean,
        required : true,
        default : false
    },
    date : {
        type : Date,
        default : Date.now
    }
});

credentialSchema.methods.toJSON = function () {
    const { __v, deleted, date, verified, password, ...data } = this.toObject();

    return data;
}

module.exports = model( 'Credential', credentialSchema );