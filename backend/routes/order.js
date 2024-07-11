const { body, param } = require("express-validator");
const auth = require("../middlwares/auth");
const validateRequest = require("../middlwares/validateRequest");
const {
  createOrder,
  getOrders,
  getOrderById,
  deleteOrder,
} = require("../controllers/order");
const createOrderRequestSchema = require("../validationSchema/createOrderRequestSchema");
const router = require("express").Router();

// create order
router.post(
  "/orders",
  auth,
  createOrderRequestSchema,
  validateRequest,
  createOrder
);

// get orders of a user
router.get("/orders", auth, getOrders);

// get details of an order
router.get(
  "/orders/:order_id",
  auth,
  [param("order_id").isUUID()],
  validateRequest,
  getOrderById
);

// delete an order
router.delete(
  "/orders/:order_id",
  auth,
  [param("order_id").isUUID()],
  validateRequest,
  deleteOrder
);

module.exports = router;
