"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "payment_methods",
      [
        {
          payment_method_id: "c1e7967d-bb6d-43af-b697-21ccced4caeb",
          name: "Cash On Delivery",
        },
        {
          payment_method_id: "5f5a5c0d-5c95-4bb5-97ed-9c9135d5d5f5",
          name: "Credit Card",
        },
        {
          payment_method_id: "0c3c9f1e-73c8-4b2d-bf2a-1a840bb8d74b",
          name: "Debit Card",
        },
        {
          payment_method_id: "4a3a3a6b-bc8b-40c9-ba7a-0d10e8c2f510",
          name: "PayPal",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("payment_methods", null, {});
  },
};
