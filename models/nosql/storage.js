const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const StorageSchema = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {// Este apartado nos sirve para poner los campos de auditoria como la fecha en que se creó y actualizó el registro
        timestamps: true, // Nos creara los campos createAt y updateAt
        versionKey: false
    }
);

StorageSchema.plugin(mongooseDelete, { overrideMethods: "all" })
module.exports = mongoose.model("storage", StorageSchema)//Se pone el nombre como queremos que se llama la tabla y el esquema que usará