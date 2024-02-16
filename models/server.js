const express = require('express');

const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.usuarioPath = '/api/usuarios';
        this.cursoPath = '/api/curso';
        this.authPath = '/api/auth';

        this.middlewares();
        this.conectarDB();
        this.routes();

    }

    middlewares(){

        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());

    }

    listen() {

        this.app.listen(this.port, () => {
        console.log('Servidor prendido y funcionando\nPuerto: ', this.port);
        });

    }

    routes() {

        this.app.use(this.usuarioPath, require('../routes/user.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.cursoPath, require('../routes/curso.routes'));

    }

    async conectarDB(){
        await dbConnection();
    }

}

module.exports = Server;