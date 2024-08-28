const { Sequelize } = require("sequelize")

const NODE_ENV = process.env.NODE_ENV

// Pendiente ajustar -_-
const database = (NODE_ENV === 'test') ? process.env.MYSQL_DATABASE_TEST : process.env.MYSQL_DATABASE
const username =  (NODE_ENV === 'test') ? process.env.MYSQL_USER_TEST : process.env.MYSQL_USER
const password = (NODE_ENV === 'test') ? process.env.MYSQL_PASSWORD_TEST : process.env.MYSQL_PASSWORD
const host = (NODE_ENV === 'test') ? process.env.MYSQL_HOST_TEST : process.env.MYSQL_HOST
const dialect = "mysql"

const sequelize = new Sequelize(
    database, 
    username, 
    password, 
    {
        host: host,
        dialect:"mysql"
    }
)


const dbConnectMySql = async () => {
    try{
        await sequelize.authenticate();
        console.log("MYSQL - Conexión exitosa")
    }catch(e){
        console.log("MYSQL - Error de conexión", e)
    }
}

module.exports = { sequelize, dbConnectMySql }