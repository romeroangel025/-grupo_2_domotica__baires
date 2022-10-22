'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orders_id: {
        type: Sequelize.INTEGER,
        references :{ //es references con "S" al final.
          model:{
            tableName: 'Orders'
          },
          key:'id'

        }
      },
      products_id: {
        type: Sequelize.INTEGER,
        references :{ //es references con "S" al final.
          model:{
            tableName: 'Products'
          },
          key:'id'

        },
        onDelete : 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};