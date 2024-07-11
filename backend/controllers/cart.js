const { Cart, Cart_detail, Product, User } = require("../models");

exports.createCart = async (req, res) => {
  const user_id = req.user.user_id;
  const products = req.body.products;

  try {
    let c = await Cart.findOne({
      where: {
        user_id,
      },
    });

    if (c) throw new Error("Cart Already exists for this user");

    const cart = await Cart.create({
      user_id,
    });

    for (const product of products) {
      let p = await Product.findByPk(product.productId);

      if (!p) throw new Error("Entered product doesn't exist.");

      if (p.stock < product.quantity)
        throw Error(
          `Not enough stock, stock: ${p.stock}, entered-quantity:${product.quantity}`
        );

      p.stock -= product.quantity;

      await p.save();

      await Cart_detail.create({
        cart_id: cart.cart_id,
        product_id: product.productId,
        quantity: product.quantity,
      });
    }

    res.json({ success: "Cart Placed Successfully!", cart });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getCarts = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const carts = await Cart.findAll({
      where: {
        user_id,
      },
      attributes: { exclude: ["user_id", "created_at", "updated_at"] },
      include: {
        model: Product,
        attributes: {
          exclude: [
            "stock",
            "category_id",
            "created_at",
            "updated_at",
            "image_url",
          ],
        },
        through: {
          attributes: { exclude: ["cart_id", "product_id"] },
        },
      },
    });
    return res.json(carts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.addProductToCart = async (req, res) => {
  const user_id = req.user.user_id;
  const cart_id = req.params.cart_id;
  const { productId: product_id, quantity } = req.body;

  try {
    // check if cart belongs to user or not
    const cart = await Cart.findByPk(cart_id, {
      where: {
        user_id,
      },
    });

    if (!cart) throw new Error("Cart does not exist.");

    let p = await Product.findByPk(product_id);

    if (!p) throw new Error("Entered product doesn't exist.");

    if (p.stock < quantity)
      throw Error(
        `Not enough stock, stock: ${p.stock}, entered-quantity:${quantity}`
      );

    p.stock -= quantity;

    await p.save();

    const cartDetail = await Cart_detail.create({
      cart_id,
      product_id,
      quantity,
    });

    res.json({ success: "product added to cart!", cartDetail });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.updateCartProductQuantity = async (req, res) => {
  const user_id = req.user.user_id;
  const { cart_id, product_id } = req.params;
  const { quantity } = req.body;

  try {
    // check if cart belongs to user or not
    const cart = await Cart.findByPk(cart_id, {
      where: {
        user_id,
      },
    });

    if (!cart) throw new Error("Cart does not exist");

    let p = await Product.findByPk(product_id);

    if (!p) throw new Error("Entered product doesn't exist.");

    const cartDetail = await Cart_detail.findOne({
      where: {
        cart_id,
        product_id,
      },
    });

    if (!cartDetail) throw new Error("Product is not present in the cart!");

    p.stock += cartDetail.quantity;

    if (p.stock < quantity)
      throw Error(
        `Not enough stock, stock: ${p.stock}, entered-quantity:${quantity}`
      );

    p.stock -= quantity;

    await p.save();
    cartDetail.quantity = quantity;

    await cartDetail.save();

    res.json({ success: "product quantity updated successfully!", cartDetail });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteCartProduct = async (req, res) => {
  const user_id = req.user.user_id;
  const { cart_id, product_id } = req.params;

  try {
    // check if cart belongs to user or not
    const cart = await Cart.findByPk(cart_id, {
      where: {
        user_id,
      },
    });

    if (!cart) throw new Error("You're not authorized to access this cart");

    let p = await Product.findByPk(product_id);

    if (!p) throw new Error("Entered product doesn't exist.");

    const cartDetail = await Cart_detail.findOne({
      where: {
        cart_id,
        product_id,
      },
    });

    if (!cartDetail) throw new Error("product doesn't exist in cart");

    p.stock += cartDetail.quantity;

    await p.save();

    await cartDetail.destroy();

    res.json({
      success: "product successfully deleted from cart",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
