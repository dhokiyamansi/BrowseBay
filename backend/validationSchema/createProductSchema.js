const { body } = require("express-validator");

const createProductSchema = [
  body("name").exists({ checkNull: true, checkFalsy: true }).trim(),
  body("description").exists({ checkNull: true, checkFalsy: true }).trim(),
  body("price").exists({ checkNull: true }).isFloat(),
  body("stock").isInt().withMessage("stock must be int"),
  body("categoryId").isUUID().withMessage("Category id must be uuid"),
];

module.exports = createProductSchema;
