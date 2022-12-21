'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.addColumn('Carts','quantity',{
        type: Sequelize.INTEGER,
      },);
     
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.removeColumn('Carts','quantity');
    
  }
};