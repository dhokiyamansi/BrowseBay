const router = require("express").Router();
const auth = require("../middlwares/auth");
const validateRequest = require("../middlwares/validateRequest");
const {
  addAddress,
  getAllAddresses,
  deleteAddress,
} = require("../controllers/address");
const { body, param } = require("express-validator");

// add address
router.post(
  "/addresses",
  auth,
  [
    body("addressLine1").exists({ checkNull: true, checkFalsy: true }).trim(),
    body("city").exists({ checkNull: true, checkFalsy: true }).trim(),
    body("state").exists({ checkNull: true, checkFalsy: true }).trim(),
    body("zipCode").exists({ checkNull: true, checkFalsy: true }).trim(),
    body("country").exists({ checkNull: true, checkFalsy: true }).trim(),
  ],
  validateRequest,
  addAddress
);

// get all addresses of a particular user
router.get("/addresses", auth, getAllAddresses);

// delete address
router.delete(
  "/addresses/:address_id",
  auth,
  [param("address_id").isUUID()],
  validateRequest,
  deleteAddress
);

module.exports = router;
