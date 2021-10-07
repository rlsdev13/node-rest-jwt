const { response } = require('express');
const jwt = require('jsonwebtoken');

const { Credential } = require('../models');

const verifyJWT = async ( req, res = response, next ) => {
    const token = req.header('x-token');

    if( !token ){
        return res.status(400).json({
            errors : [{
                msg : "No tienes permiso",
                param : "x-token",
                location : "header"
            }] 
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        //read the credentials
        const userAuthenticated = await Credential.findById( uid );

        if ( !userAuthenticated ) {
            return res.status(400).json({
                errors : [{
                    msg : "User doesn't exist",
                }]
            });
        }

        if ( userAuthenticated.deleted ) {
            return res.status(400).json({
                errors : [{
                    msg : "User doesn't exist",
                }]
            });
        }

        req.userAuthenticated = userAuthenticated;

        next();
    } catch (error) {
        // console.log(error);

        return res.status(401).json({
            errors : [{
                msg : "No tienes permiso",
                param : "x-token",
                location : "header"
            }]
        });
    }

}

module.exports = {
    verifyJWT
}