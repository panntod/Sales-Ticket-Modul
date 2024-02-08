'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ticket, {
        foreignKey: 'id', as: 'ticket'
      })
      this.belongsTo(models.event)
    }
  }
  seat.init({
    eventID: DataTypes.INTEGER,
    rowNum: DataTypes.STRING,
    seatNum: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'seat',
  });
  return seat;
};