const { body } = require("express-validator");

const createOrderRequestSchema = [
  body("addressId").isUUID(),
  body("paymentMethodId").isUUID(),
];

module.exports = createOrderRequestSchema;
