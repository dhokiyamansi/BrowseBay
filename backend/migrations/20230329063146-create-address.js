"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      address_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },
      address_line1: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address_line2: {
        type: Sequelize.STRING,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      zip_code: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};
