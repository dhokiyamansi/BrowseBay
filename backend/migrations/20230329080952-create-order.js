"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      order_id: {
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
      address_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Addresses",
          key: "address_id",
        },
        onDelete: "CASCADE",
      },
      payment_method_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "payment_methods",
          key: "payment_method_id",
        },
      },
      total_amount: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
