'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ticket, {
        foreignKey: 'id', as: 'ticket'
      })
      this.hasMany(models.seat, {
        foreignKey: 'id', as: 'seat'
      })
    }
  }
  event.init({
    eventName: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    venue: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};