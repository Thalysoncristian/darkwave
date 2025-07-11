'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Playlist.hasMany(models.Agendamento, { foreignKey: 'playlistId' });
    }
  }
  Playlist.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};