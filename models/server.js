const express = require('express');

const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();
        this.conectarDB();


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

    async conectarDB(){
        await dbConnection();
    }

}

module.exports = Server;