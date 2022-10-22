'use strict';
const categories = [
  {
    title: 'Oferta',
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    title: 'Destacado',
    createdAt : new Date(),
    updatedAt : new Date()

  },
  {
    title: 'Carrito',
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    title: 'Sensores y alarmas',
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    title: 'Iluminacion',
    createdAt : new Date(),
    updatedAt : new Date()
  },
  {
    title: 'Electronica, audio y video',
    createdAt : new Date(),
    updatedAt : new Date()
  }
  ]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Categories',categories, {});
    
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
