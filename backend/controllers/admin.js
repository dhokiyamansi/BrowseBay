const { Product, Category } = require("../models");

const cloudinary = require("../utils/cloudinary");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.build({ name });
    await category.save();
    res.json({ success: "Category added Successfully!", category });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const category_id = req.params.category_id;

  try {
    if (!category_id) throw new Error("Please Provide a Category");

    const category = await Category.findByPk(category_id);

    if (!category)
      throw new Error("There's no such category available in database.");

    await category.destroy();

    res.json({ success: "Category deleted Succesfully!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.addProduct = async (req, res) => {
  const { name, description, price, stock, categoryId: category_id } = req.body;

  try {
    const product = await Product.build({
      name,
      description,
      price,
      stock,
      category_id,
    });
    let savedProduct = await product.save();

    const upload = await cloudinary.v2.uploader.upload(req.file.path, {
      public_id: `Hardik/Products/${savedProduct.product_id}`,
    });

    res.json({ success: "Product Added Successfully!", product, upload });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const product_id = req.params.product_id;

  try {
    if (!product_id) throw new Error("Please provide a product id");

    const product = await Product.findByPk(product_id);

    if (!product) throw new Error("No such Product found.");

    await product.destroy();

    await cloudinary.v2.uploader.destroy(`Hardik/Products/${product_id}`);

    res.json({ success: "Product deleted Successfully!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
