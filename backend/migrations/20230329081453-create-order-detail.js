"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable("Order_details", {
      order_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: "Orders",
          key: "order_id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: "Products",
          key: "product_id",
        },
        onDelete: "CASCADE",
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
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
    await queryInterface.dropTable("Order_details");
  },
};
