'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.addColumn('Orders','statusId',{
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Statuses'
          },
          key : 'id'
        }
      },);
     
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.removeColumn('Orders','statusId');
    
  }
};