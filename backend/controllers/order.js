const {
  Order,
  Order_detail,
  Product,
  User,
  payment_method,
  Address,
  Cart,
} = require("../models");

function ResponseOrder() {}

exports.createOrder = async (req, res) => {
  const user_id = req.user.user_id;
  const { addressId: address_id, paymentMethodId: payment_method_id } =
    req.body;

  try {
    let cart = await Cart.findOne({
      where: {
        user_id,
      },
      attributes: ["cart_id"],
      include: {
        model: Product,
        attributes: ["product_id", "price"],
        through: {
          attributes: ["quantity"],
        },
      },
    });

    if (!cart) throw new Error("Cart doesn't exist");

    let total_amount = 0;

    cart.Products.forEach((p) => {
      total_amount += parseFloat(p.price) * p.Cart_detail.quantity;
    });

    const order = await Order.create({
      user_id,
      address_id,
      payment_method_id,
      total_amount,
    });

    for (const product of cart.Products) {
      await Order_detail.create({
        order_id: order.order_id,
        product_id: product.product_id,
        quantity: product.Cart_detail.quantity,
        price: product.Cart_detail.quantity * parseFloat(product.price),
      });
    }

    await cart.destroy();
    res.json({ success: "Order Placed Successfully!", order });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getOrders = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const orders = await Order.findAll({
      order: [["created_at", "desc"]],
      where: {
        user_id,
      },
      attributes: {
        exclude: ["user_id", "address_id", "payment_method_id", "updated_at"],
      },
      include: [
        {
          model: payment_method,
          attributes: {
            exclude: ["payment_method_id"],
          },
        },
        {
          model: Address,
          attributes: {
            exclude: ["address_id", "user_id"],
          },
        },
        {
          model: Product,
          attributes: {
            exclude: ["stock", "category_id", "created_at", "updated_at"],
          },
          through: {
            attributes: ["quantity", "price"],
          },
        },
      ],
    });

    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getOrderById = async (req, res) => {
  const order_id = req.params.order_id;
  const user_id = req.user.user_id;

  try {
    const order = await Order.findByPk(order_id, {
      where: {
        user_id,
      },
      attributes: {
        exclude: ["user_id", "address_id", "payment_method_id", "updated_at"],
      },
      include: [
        {
          model: payment_method,
          attributes: {
            exclude: ["payment_method_id"],
          },
        },
        {
          model: Address,
          attributes: {
            exclude: ["address_id", "user_id"],
          },
        },
        {
          model: Product,
          attributes: {
            exclude: ["stock", "category_id", "created_at", "updated_at"],
          },
          through: {
            attributes: ["quantity", "price"],
          },
        },
      ],
    });

    if (!order) throw new Error("Order not found!");

    res.json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const order_id = req.params.order_id;
  const user_id = req.user.user_id;

  try {
    const order = await Order.findOne({
      where: {
        order_id,
        user_id,
      },
      attributes: ["order_id"],
      include: {
        model: Product,
        attributes: ["product_id"],
        through: {
          attributes: ["quantity"],
        },
      },
    });

    if (!order) throw new Error("Order with provided orderId does not exist.");

    const Products = order.Products;

    for (const product of Products) {
      let p = await Product.findByPk(product.product_id);
      p.stock += product.Order_detail.quantity;
      await p.save();
    }

    await order.destroy();
    // const count = await Order.destroy({
    //   where: {
    //     order_id,
    //     user_id,
    //   },
    // });

    // if (count === 0) throw new Error("Such order does not exist!");

    res.json({ success: "order deleted!" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
