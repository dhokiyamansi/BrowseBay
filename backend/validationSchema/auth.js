const { body } = require("express-validator");

exports.loginUserSchema = [
  body("email").trim().isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
];

exports.registerUserSchema = [
  body("name")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Please provide a name")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Minimum length of name should be 3 and should not exceed 50."
    ),
  body("email").trim().isEmail().normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long."),
  body("phoneNumber")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number should be 10 digits only"),
];
