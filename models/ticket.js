'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.event)
      this.belongsTo(models.user)
      this.belongsTo(models.seat)
    }
  }
  ticket.init({
    eventID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    seatID: DataTypes.INTEGER,
    bookedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ticket',
  });
  return ticket;
};