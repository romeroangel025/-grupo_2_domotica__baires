'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cart,{
        foreignKey : 'orders_id',
        as : 'items',
        onDelete : 'cascade'
      });

      this.belongsTo(models.User, {
        foreignKey : 'users_id',
        as : 'user'
      });

      this.belongsTo(models.Status, {
        foreignKey : 'statusId',
        as : 'status'
      });
    }
  }
  Order.init({
    date: DataTypes.STRING,
    total: DataTypes.STRING,
    users_id: DataTypes.INTEGER,
    statusId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};