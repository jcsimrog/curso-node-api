const { matchedData, body } = require("express-validator");
const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Obtener una lista de datos
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {
    
    try {
        //const user = req.user;
        const data = await tracksModel.findAllData({}); //Si existe un awai debe existir un async
        //res.send({data, user})
        res.send({ data })
    }catch(e){
        console.log(e)
        handleHttpError(res, 'ERROR_EN_GET_ITEM');
    }
    
    
};

/**
 * Obtener un registro
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findOneData(id);
        res.send({ data })
    }catch(e){
        console.log(e)
        handleHttpError(res, 'ERROR_GET_ITEM');
    }

};

/**
 * Crear un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {

    try {
        //const body = req.body
        //const bodyClean = matchedData(req) //matchedData nos limpia el body dejando solo los valores definidos en el modelo, los demas datos los quita

        const body = matchedData(req)
        const data = await tracksModel.create(body);

        res.status(201);
        res.send({ data })
    }catch(e){
        handleHttpError(res, 'ERROR_CREANDO_ITEM');
    }
    
};

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {

    try {  
        //const body = matchedData(req)
        const {id, ...body} = matchedData(req) //Esta línea indica que del request quite el ID y el resto lo ponga en body
        const data = await tracksModel.findByIdAndUpdate(
            { _id: id }, 
            body, { new: true }
        );
        res.send( { data })

        //res.send({ body })
    }catch(e){
        handleHttpError(res, 'ERROR_UPDATE_ITEM');
    }

};

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {

    try {
        req = matchedData(req);
        const {id} = req;
        //deleteOne es un método nativo de MongoDB y si borrara el registro, delete es de la libreria mongoose-delete y hara el borrado lógico
        const deleteResponse = await tracksModel.delete({_id:id});
        const data = {
            deleted: deleteResponse.matchedCount
        }
        
        res.send({data});
    }catch(e){
        console.log(e)
        handleHttpError(res, 'ERROR_DELETE_ITEM');
    }

};


module.exports = { getItems, getItem, createItem, updateItem, deleteItem };