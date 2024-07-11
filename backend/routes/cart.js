const {
  createCart,
  getCarts,
  addProductToCart,
  updateCartProductQuantity,
  deleteCartProduct,
} = require("../controllers/cart");

// import validation schema
const {
  addProductToCartValidationSchema,
  createCartValidationSchema,
  updateCartProductQuantityValidationSchema,
  deleteCartProductValidationSchema,
} = require("../validationSchema/cart");

const auth = require("../middlwares/auth");
const validateRequest = require("../middlwares/validateRequest");

const router = require("express").Router();

// create cart
router.post(
  "/carts",
  auth,
  createCartValidationSchema,
  validateRequest,
  createCart
);

// get all carts (There's only one :)
router.get("/carts", auth, getCarts);

// add product to cart
router.post(
  "/carts/:cart_id/products",
  auth,
  addProductToCartValidationSchema,
  validateRequest,
  addProductToCart
);

// update quantity of product in cart
router.put(
  "/carts/:cart_id/products/:product_id",
  auth,
  updateCartProductQuantityValidationSchema,
  validateRequest,
  updateCartProductQuantity
);

// delete a product from cart
router.delete(
  "/carts/:cart_id/products/:product_id",
  auth,
  deleteCartProductValidationSchema,
  validateRequest,
  deleteCartProduct
);

module.exports = router;
