const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {//userid
    
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn : '3h'
        }, ( error, token) => {
            if( error ){
                console.log(err);
                reject('No se pudo generar el JWT');
            }else{
                resolve( token );
            }
        });
    });
}

module.exports = {
    generateJWT
}