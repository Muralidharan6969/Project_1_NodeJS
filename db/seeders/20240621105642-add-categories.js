'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Categories', [
    {
      categoryName: 'Mobile Accessories',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryName: 'Fashion',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryName: 'Electronic Accessories',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categoryName: 'Houseold Items',
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
