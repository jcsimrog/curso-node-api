//Declaración del paquete mongoose
const mongoose = require("mongoose")

const NODE_ENV = process.env.NODE_ENV

//Declaración de la función
const dbConnect = () => {

    const DB_URI = (NODE_ENV === 'test') ? process.env.DB_URI_TEST : process.env.DB_URI;
    
    mongoose
    .connect(DB_URI)
    .catch((error) => {
      console.log("MongoDB - Error en la conexión");
    })
    .then(() => {
      console.log("MongoDB - Conexión Exitosa");
    });
};

// Esta línea indica que será una función (dbConnect) a exportar para poder utilizarla en otros lugares
module.exports = dbConnect

