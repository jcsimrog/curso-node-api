const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            select: false
        },
        role: {
            type: ["user", "admin"], // Este es un tipo de dato como un enum donde se le dan las opciones que puede tener
            default: "user" // Se le indica el valor por default que va a tener el campo
        }
    },
    {// Este apartado nos sirve para poner los campos de auditoria como la fecha en que se creó y actualizó el registro
        timestamps: true, // Nos creara los campos createAt y updateAt
        versionKey: false
    }
);

// Se indica que queremos que exporte un modelo de mongoose
UserSchema.plugin(mongooseDelete, { overrideMethods: "all" })// Borrado lógico
module.exports = mongoose.model("users", UserSchema)//Se pone el nombre como queremos que se llama la tabla y el esquema que usará