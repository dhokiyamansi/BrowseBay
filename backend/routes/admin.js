const router = require("express").Router();
// import controllers
const {
  addProduct,
  createCategory,
  deleteCategory,
  deleteProduct,
  getAllProducts,
} = require("../controllers/admin");

// import middlwares
const validateRequest = require("../middlwares/validateRequest");
const auth = require("../middlwares/auth");
const isAdmin = require("../middlwares/isAdmin");
const upload = require("../middlwares/multer");

const createProductSchema = require("../validationSchema/createProductSchema");
const { body, param } = require("express-validator");

// get all products (for admin)
router.get("/products", auth, isAdmin, getAllProducts);

// create category
router.post(
  "/categories",
  auth,
  isAdmin,
  [body("name").exists({ checkNull: true, checkFalsy: true }).trim()],
  validateRequest,
  createCategory
);

// delete a category
router.delete(
  "/categories/:category_id",
  auth,
  isAdmin,
  [param("category_id").isUUID()],
  validateRequest,
  deleteCategory
);

// add product
router.post(
  "/products",
  auth,
  isAdmin,
  upload.single("productImage"),
  createProductSchema,
  validateRequest,
  addProduct,
  (err, req, res, next) => {
    res.status(500).json({ error: err.message });
  }
);

// delete a product
router.delete(
  "/products/:product_id",
  auth,
  isAdmin,
  [param("product_id").isUUID()],
  validateRequest,
  deleteProduct
);

module.exports = router;
