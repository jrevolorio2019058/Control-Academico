const mongoose = require('mongoose');

const dbConnection = async () => {

    try{
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Conexión Con DB Exitosa');
    } catch(e){
        throw new Error('Error Conexión DB', e);
    }

}

module.exports = {
    dbConnection
}