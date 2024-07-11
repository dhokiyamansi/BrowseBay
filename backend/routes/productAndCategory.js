const {
  getAllCategories,
  getProductDetail,
  getProductsByCategory,
  search,
  getProductImage,
  fetchAllCategories,
} = require("../controllers/productAndCategory");

const validateRequest = require("../middlwares/validateRequest");
const { param, query, body } = require("express-validator");

const router = require("express").Router();

// get/list all categories
// GET /api/categories?page=1&size=8
router.get("/categories", getAllCategories);

// get products of a particular category
// GET /api/categories/:category_id/products?page=1&size=9
// GET /api/categories/:category_id/products?sortBy=price:asc&sortBy=created_at:desc
router.get(
  "/categories/:category_id/products",
  [param("category_id").isUUID()],
  validateRequest,
  getProductsByCategory
);

// search products
// GET /api/products/search?q=nike
// GET /api/products/search?page=1&size=9
// GET /api/products/search?sortBy=price:asc&sortBy=created_at:desc
router.get(
  "/products/search",
  [
    query("q")
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage("query shouldn't be empty")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 letters required to search."),
  ],
  validateRequest,
  search
);

// get product image
router.get(
  "/products/photo/:product_id",
  [param("product_id").isUUID().withMessage("ProductID should be UUID.")],
  validateRequest,
  getProductImage
);
// get product details
router.get(
  "/products/:product_id",
  [param("product_id").isUUID()],
  validateRequest,
  getProductDetail
);

router.get("/categories/all", fetchAllCategories);

module.exports = router;
