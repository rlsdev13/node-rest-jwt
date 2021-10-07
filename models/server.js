const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth : '/api/auth',
            user : '/api/user'
        }

        this.conexionDB();

        this.middlewares();

        this.routes();
    }

    async conexionDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //contenido statico
        this.app.use( express.static('public') );

        //JSON
        this.app.use( express.json() );
    }

    routes(){
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.user, require('../routes/user'));
    }

    listen(){
        this.app.listen( this.port , () => {
            console.log(`Server on: ${this.port}`);
        });
    }
}

module.exports = Server;