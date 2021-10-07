const { Credential } = require('../models');

const emailExist = async( email = '' ) => {
    
    const emailExist = await Credential.exists({email});

    if (emailExist) {
        throw new Error(`El email '${email}' ya se encuentra registrado.`);
    }

    return true;
    
}

module.exports = {
    emailExist
}