const { handleHttpError } = require("../utils/handleError");

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles) => (req, res, next) => {

    try{
        const { user } = req;
        const rolesByUser = user.role;//TODO ["user"]

        console.log({ user })
        console.log({ roles })
        console.log({ rolesByUser })

        //TODO: Valida que el rol del usuario este dentro de la lista de roles permitidos (admin, manager, user, etc..)
        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle)) //TODO true
        if(!checkValueRol){
            handleHttpError(res, "USER_NOT_PERMISSIONS", 403)
            return
        }

        next()
    }catch(e){
        handleHttpError(res, "ERROR_ROL_PERMISSIONS", 401)
    }

}

module.exports = checkRol;