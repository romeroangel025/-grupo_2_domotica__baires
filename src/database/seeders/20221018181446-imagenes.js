'use strict';


const imagesDB = require('../../data/image.json')


const images = imagesDB.map(({imagen}, index) => {
  return {
   name: imagen,
   'product_id':index + 1,
   createdAt : new Date()
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Images",images,{}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};