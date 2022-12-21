'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {

    static associate(models) {

      this.belongsTo(models.Order, {
        foreignKey: 'orders_id',
        as: 'order'
      });

      this.belongsTo(models.Product, {
        foreignKey: 'products_id',
        as: 'product'
      })
    }

}
Cart.init({
  orders_id: DataTypes.INTEGER,
  products_id: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'Cart',
});
return Cart;
};