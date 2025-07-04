'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Agendamento.belongsTo(models.Programa, { foreignKey: 'programaId' });
      Agendamento.belongsTo(models.Playlist, { foreignKey: 'playlistId' });
    }
  }
  Agendamento.init({
    programaId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    inicio: DataTypes.DATE,
    fim: DataTypes.DATE,
    descricao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Agendamento',
  });
  return Agendamento;
};