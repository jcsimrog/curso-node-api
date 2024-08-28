const { verify } = require("jsonwebtoken");
const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { usersModel } = require("../models")
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties();

const authMiddleware = async (req, res, next) => {
    try{

        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401)
            return;
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401)
            return
        }

        const query = {
            [propertiesKey.id]: dataToken._id
        }

        //const user = await usersModel.findById(dataToken._id) //Se quita el método findById porque solo es para mongodb
        const user = await usersModel.findOne(query) // Se remplaza por findOne porque este funciona para Mongo y MySql
        req.user = user

        next()

    }catch(e){
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = authMiddleware