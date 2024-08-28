const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties();

/**
 * Se debe pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
      {
        //_id: user._id,
        [propertiesKey.id]: user[propertiesKey.id], //Esto se ajusta para el cambio de BD sql a nosql sea transparente para la propiedad id
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
  
    return sign
};

/**
 * Se debe pasar el token de sesión el JWT
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try{
        return jwt.verify(tokenJwt, JWT_SECRET)
    }catch(e){
        return null;
    }
}

module.exports = { tokenSign, verifyToken }