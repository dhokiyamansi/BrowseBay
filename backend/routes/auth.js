const router = require("express").Router();
const { register, login, logout, getUser } = require("../controllers/auth");
const validateRequest = require("../middlwares/validateRequest");

// import request validation schema
const {
  loginUserSchema,
  registerUserSchema,
} = require("../validationSchema/auth");

const auth = require("../middlwares/auth");
// routes for register, login and logout.

// register
router.post("/users/register", registerUserSchema, validateRequest, register);

// login
router.post("/users/login", loginUserSchema, validateRequest, login);

// logout
router.post("/users/logout", auth, logout);

// get user profile
// router.get("/users/me", getUser);

module.exports = router;
