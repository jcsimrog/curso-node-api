const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt")
const { handleHttpError } = require("../utils/handleError")
const { encrypt, compare} = require("../utils/handlePassword")
const { usersModel } = require("../models")

/**
 * Controlador encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerControl = async(req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = {...req, password}
        const dataUser = await usersModel.create(body)
        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.status(201)
        res.send({ data })
    }catch(e){
        console.log(e);
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
    
}

const loginControl = async (req, res) => {
    try{
        req = matchedData(req)
        // Agregamos .select('password') porque en el modelo indicamos que no lo trajera en las consultas, si no tuviera definido
        // el select en el modelo user, no habría necesidad de ponerlo
        const user = await usersModel.findOne({ email: req.email })
        .select('password name role email') //Este se usaba con Mongo
        
        if(!user){
            handleHttpError(res, "USER_NOT_EXIST", 404)
            return
        }

        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "PASSWORD_IVALID", 401)
            return
        }

        user.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({ data })

    }catch(e){
        console.log(e)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = { registerControl, loginControl }