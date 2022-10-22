'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Order,{
      as:"orders",
      through:"carts",
       foreignKey: "products_id",
       otherKey:"orders_id",
       timestamps:false
      }

      );

      Product.hasMany(models.Category,{
        as:"categories",
        foreignKey:"category_id"
      })

      Product.hasMany(models.Image,{
        as : 'images',
        foreignKey : 'product_id',
        onDelete : 'cascade'
      });

    }
  }
  Product.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    //paranoid : true
  });
  return Product;
};