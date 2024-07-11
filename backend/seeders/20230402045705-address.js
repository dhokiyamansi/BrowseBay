'use strict';

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
   await queryInterface.bulkInsert('Addresses', [
    {
      address_id: '0825a0ec-3ca8-4339-a8ca-346a56fcf2cf',
      user_id: 'b5e6b622-09a4-413e-9719-330ba6e44b26',
      address_line1: '1264 E 84th St',
      address_line2: null,
      city: 'Los Angeles',
      state: 'California',
      zip_code: '90001',
      country: 'United States'
    },
    {
      address_id: '0825a0ec-3ca8-4339-a8ca-346a56fcf2cd',
      user_id: 'b5e6b622-09a4-413e-9719-330ba6e44b26',
      address_line1: '6666 E 84th St',
      address_line2: null,
      city: 'Los Angeles',
      state: 'California',
      zip_code: '90001',
      country: 'United States'
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
     await queryInterface.bulkDelete('Addresses', null, {});
  }
};
