const { payment_method } = require("../models");

exports.getAllPaymentMethods = async (req, res) => {
  try {
    const payment_methods = await payment_method.findAll();
    res.json(payment_methods);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
