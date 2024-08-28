const express = require("express")
const fs = require("fs")
const router = express.Router(); //El manejador de express para las rutas

const PATH_ROUTES = __dirname;

// const a = fs.readdirSync(PATH_ROUTES) //Esto nos devuelve un array con los archivos que se encuentran dentro de la carpeta routes
// console.log({a}) // { a: [ 'index.js', 'tracks.js' ] }

const removeExtension = (fileName) => {
    //TODO trancks.js [traks, js]
    return fileName.split('.').shift()
}


fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file) //TODO index, tracks
    if(name !== 'index'){
        console.log(`Cargando rutas ${name}`)
        router.use(`/${name}`, require(`./${file}`)) //TODO http://localhost:300/api/tracks
    }
});





module.exports = router