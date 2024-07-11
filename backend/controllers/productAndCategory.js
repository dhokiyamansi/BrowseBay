const { Product, Category, sequelize } = require("../models");
const { Op, Sequelize } = require("sequelize");
const cloudinary = require("../utils/cloudinary");
const http = require("http");

exports.getAllCategories = async (req, res) => {
  let { page, size } = req.query;
  page = page ? parseInt(page) : 0;
  size = size ? parseInt(size) : 9;

  try {
    const categories = await Category.findAll({
      offset: page * size,
      limit: size,
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  let { page, size, sortBy } = req.query;
  page = page ? parseInt(page) : 0;
  size = size ? parseInt(size) : 9;

  let order = [["price", "asc"]];

  if (sortBy) {
    if (Array.isArray(sortBy))
      order = sortBy.map((item) => {
        return item.split(":");
      });
    else if (typeof sortBy === "string") {
      order = new Array(sortBy.split(":"));
    }
  }

  try {
    const category_id = req.params.category_id;

    let products = await Category.findByPk(category_id, {
      include: {
        model: Product,
        offset: page * size,
        limit: size,
        order,
        attributes: {
          exclude: ["category_id", "created_at", "updated_at"],
        },
      },
    });

    if (products === null) return res.json([]);

    products = products.get({ plain: true });

    if (products) {
      products.totalPages = Math.ceil(products.Products.length / size);
      products.currentPage = page;
    }

    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const product_id = req.params.product_id;

    const product = await Product.findByPk(product_id);

    res.json(product);
  } catch (error) {
    res.status(500);
  }
};

exports.search = async (req, res) => {
  let { q, page, size, sortBy, orderBy } = req.query;
  page = page ? parseInt(page) : 0;
  size = size ? parseInt(size) : 9;

  let order = [["price", "asc"]];

  if (sortBy) {
    if (Array.isArray(sortBy))
      order = sortBy.map((item) => {
        return item.split(":");
      });
    else if (typeof sortBy === "string") {
      order = new Array(sortBy.split(":"));
    }
  }

  try {
    const result = await Product.findAndCountAll({
      where: {
        name: sequelize.where(
          sequelize.fn("LOWER", sequelize.col("name")),
          "LIKE",
          `%${q.toLowerCase()}%`
        ),
      },
      attributes: {
        exclude: ["stock", "category_id", "created_at", "updated_at"],
      },
      offset: page * size,
      limit: size,
      order,
    });

    const { count: totalProducts, rows: products } = result;

    res.json({
      totalProducts,
      products,
      totalPages: Math.ceil(totalProducts / size),
      currentPage: page,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getProductImage = async (req, res) => {
  cloudinary.v2.api.resource(
    `Hardik/Products/${req.params.product_id}`,
    function (error, result) {
      if (error) return res.status(500).send({ error: error.message });

      http
        .get(result.url, (imageRes) => {
          const chunks = [];

          imageRes.on("data", (chunk) => {
            chunks.push(chunk);
          });

          imageRes.on("end", () => {
            const imageData = Buffer.concat(chunks);
            res.set("Content-Type", "image/jpeg");
            res.send(imageData);
          });
        })
        .on("error", (error) => {
          console.error(error);
          res.status(500).send("Error fetching image");
        });
    }
  );
};

exports.fetchAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
