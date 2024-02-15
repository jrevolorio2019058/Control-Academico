const express = require('express');

const cors = require('cors');

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.middlewares();


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

}

module.exports = Server;