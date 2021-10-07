const { response } = require('express');
const bcrypt = require('bcrypt');

const { Credential, User } = require('../models');

const getUsers = async( req, res = response) => {
    const { limit = 1, skip = 0 } = req.query;

    const query = {
        deleted : false
    }

    try {
        const [ usersTotal , users ] = await Promise.all([
            Credential.countDocuments(query),
            Credential.find(query)
                      .populate('user',['name', 'last_name'])
                      .limit(Number(limit))
                      .skip(Number(skip))
        ]);

        return res.status(200).json({
            usersTotal,
            users
        });
    } catch (error) {
        console.log(error);

        return res.status().json({
            msg : "Error"
        });
    }
}

const postUser = async( req, res = response ) => {
    
    const { 
        email,
        password,
        name,
        last_name,
        date_birth,
        state
    } = req.body;

    const userData = { name, last_name, date_birth, state }

    const credentialsData = { email } 

    try {
        
        const user = new User(userData);
        const credentials = new Credential(credentialsData);
        credentials.user = user;

        const salt = bcrypt.genSaltSync();
        credentials.password = bcrypt.hashSync( password, salt );
        
        await Promise.all([
            user.save(),
            credentials.save()
        ]);

        return res.json({
            user,
            credentials
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg : "error"
        });
    }
    
}

module.exports = {
    getUsers,
    postUser
}
