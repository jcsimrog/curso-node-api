const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");

const Tracks = sequelize.define(
  "tracks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    artist_name: {
      type: DataTypes.STRING,
    },
    artist_nickname: {
      type: DataTypes.STRING,
    },
    artist_nationality: {
      type: DataTypes.STRING,
    },
    duration_start: {
      type: DataTypes.INTEGER,
    },
    duration_end: {
      type: DataTypes.INTEGER,
    },
    mediaId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Implementando modelo personalizado
 */

Tracks.findAllData = function () {
  Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    //as: "audio",
  });
  //return Tracks.findAll({ include: 'audio' }); // Con este se le pone un alias llamado audio
  return Tracks.findAll({ include: Storage }) // Con este llega la data con el nombre de la tabla
};

Tracks.findOneData = function (id) {
  Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    //as: "audio",
  });
  //return Tracks.findOne({ where: { id }, include: "audio" });
  return Tracks.findOne({ where: { id }, include: Storage });
};

// Tracks.find = Tracks.findAll;
// Tracks.findById = Tracks.findByPk;
module.exports = Tracks;