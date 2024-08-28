const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

//Se debe crear un objeto por cada middleware que uno quiera apolicar
// const validatorCreateItem = [
//     //Validamos que exista la propiedad name, validamos que no venga vacia, validamos que su tamaño este dentro de 5 y 40
//     //check("name").exists().notEmpty.length({min: 5, max40})
//     check("name").exists().notEmpty,
//     check("album").exists().notEmpty,
//     check("artist").exists().notEmpty,
//     check("artist.name").exists().notEmpty,
//     check("artist.nickname").exists().notEmpty,
//     check("artist.nationality").exists().notEmpty,
//     check("duration").exists().notEmpty,
//     check("duration.strat").exists().notEmpty,
//     check("duration.end").exists().notEmpty,
//     check("mediaId").exists().notEmpty, //.isMongoId es para cuando es un Object de Mongo que cambie por String
//     (req, res, next) => {
//        return validateResults(req, res, next);
//     }
// ];

// module.exports = { validatorCreateItem }

const validatorCreateItem = [
    check("name")
    .exists()
    .notEmpty(),
    check("album")
    .exists()
    .notEmpty(),
    check("cover")
    .exists()
    .notEmpty(),
    check("artist")
    .exists()
    .notEmpty(),
    check("artist.name")
    .exists()
    .notEmpty(),
    check("artist.nickname")
    .exists()
    .notEmpty(),
    check("artist.nationality")
    .exists()
    .notEmpty(),
    check("duration")
    .exists()
    .notEmpty(),
    check("duration.start")
    .exists()
    .notEmpty(),
    check("duration.end")
    .exists()
    .notEmpty(),
    check("mediaId")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { validatorCreateItem, validatorGetItem }