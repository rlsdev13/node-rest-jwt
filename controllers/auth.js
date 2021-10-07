const { response } = require('express');
const bcrypt = require('bcrypt');

const { generateJWT } = require('../helpers');
const { Credential } = require('../models');



const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        //verify email
        const credential = await Credential.findOne({ email }); 

        if( !credential ){
            return res.status(400).json({
                msg : "Las credenciales son incorrectas"
            });
        }

        //verify user deleted
        if( credential.deleted ){
            return res.status(400).json({
                msg : "Las credenciales son incorrectas"
            });
        }

        //verify password
        const validatePass = bcrypt.compareSync( password, credential.password );

        if ( !validatePass ) {
            return res.status(400).json({
                msg : "Las credenciales son incorrectas"
            });
        }

        //generate JWT
        const token = await generateJWT( credential.id );

        return res.status(200).json({
            credential,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg : "Error"
        });
    }
}

module.exports = {
    login
}