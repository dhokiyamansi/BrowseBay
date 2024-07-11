const { body, param } = require("express-validator");

exports.createCartValidationSchema = [
  body("products").isArray(),
  body("products.*.productId").isUUID(),
  body("products.*.quantity").isInt({ min: 1 }),
];

exports.addProductToCartValidationSchema = [
  param("cart_id").isUUID(),
  body("productId").isUUID(),
  body("quantity").isInt({ min: 1 }),
];

exports.updateCartProductQuantityValidationSchema = [
  param("cart_id").isUUID(),
  param("product_id").isUUID(),
  body("quantity").isInt({ min: 1 }),
];

exports.deleteCartProductValidationSchema = [
  param("cart_id").isUUID(),
  param("product_id").isUUID(),
];
