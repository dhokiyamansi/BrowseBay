const router = require("express").Router();
const { getAllPaymentMethods } = require("../controllers/paymentMethod");

router.get("/payment_methods", getAllPaymentMethods);

module.exports = router;
