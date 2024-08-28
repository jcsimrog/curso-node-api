const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const TrackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      },
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

/**
 * Implementar método propio con relación a storage
 */
TrackSchema.statics.findAllData = function (){
    const joinData = this.aggregate([ //TODO tracks, estamos en el modelo de canciones
        {
            $lookup: {
                from: "storages", //TODO tracks --> storage Aqui se hace la relación con storage
                localField: "mediaId",// TODO tracks, Llave foranea, esta en tracks.mediaId
                foreignField: "_id",//TODO storage._id La llave en la tabla de storage
                as: "audio" //TODO Lo que consiga lo pondra es este alias "audio"
            },
        },
        {
            $unwind: "$audio"
        }
    ])
    return joinData
};

TrackSchema.statics.findOneData = function (id){
    const joinData = this.aggregate([ //TODO tracks, estamos en el modelo de canciones
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            }
        },
        {
            $lookup: {
                from: "storages", //TODO tracks --> storage Aqui se hace la relación con storage
                localField: "mediaId",// TODO tracks, Llave foranea, esta en tracks.mediaId
                foreignField: "_id",//TODO storage._id La llave en la tabla de storage
                as: "audio" //TODO Lo que consiga lo pondra es este alias "audio"
            },
        },
        {
            $unwind: "$audio"
        },
    ])
    return joinData
};
   

// Se indica que queremos que exporte un modelo de mongoose
TrackSchema.plugin(mongooseDelete, { overrideMethods: "all" })//Aquí indicamos que usaremos los metodos de mongoose-delete 
module.exports = mongoose.model("tracks", TrackSchema)//Se pone el nombre como queremos que se llama la tabla y el esquema que usará