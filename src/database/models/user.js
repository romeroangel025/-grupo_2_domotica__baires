'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order,
       {
        as:"orders",
        foreignKey:"users_id"
       } )
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      validate:{
        is: /^[a-z]+$/i
      }
    },
    surname:{
      type: DataTypes.STRING,
      validate:{
        is: /^[a-z]+$/i
      }
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.STRING,
    avatar: DataTypes.STRING,
    tel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};