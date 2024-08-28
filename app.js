require("dotenv").config()
const express = require("express")
const cors = require("cors")
const swaggerUI = require("swagger-ui-express")
const dbConnectNoSql = require('./config/mongo') //importamos el archivo de conexión a Mongo para poder usarlo
const { dbConnectMySql } = require("./config/mysql") //Impoorta la conexión a MySQL

const morganBody = require("morgan-body")
const openApiConfigration = require("./docs/swagger")
const loggerStream = require("./utils/handleLogger")

const app = express()

const ENGINE_DB = process.env.ENGINE_DB
const NODE_ENV = process.env.NODE_ENV || 'development'

app.use(cors())
app.use(express.json())
app.use(express.static("storage")) //Aqui se le indica mediante express que los recursos staticos los saque de la carpeta storage

//Lo necesario para interceptar los http status y poder loguear errore
morganBody(app, {
    noColors:true,
    stream: loggerStream,
    skip: function(req, res){
         return res.statusCode < 400 //TODO 2xxx, 3xxx Solo generara log con errores mayores a 400 
    }
})

const port = process.env.PORT || 3000

//Definir ruta de documentación
app.use('/documentation', 
    swaggerUI.serve, 
    swaggerUI.setup(openApiConfigration))


/**
 * Aqui invocamos a las rutas
 */

// TODO http://localhost/api/...
app.use("/api", require("./routes"))

if(NODE_ENV !== 'test'){
    app.listen(port) // Tambien se puede poner así no queremos agregar la función adicional
    // app.listen(port, () => {
    //     //console.log('Tu app esta lista por http://localhost:' + port)
    // }); // Se puso de esta forma solo para mostrar el log
}


(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql()

module.exports = app // Esto se hace para que funcionen las pruebas