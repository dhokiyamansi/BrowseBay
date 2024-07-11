const { Address } = require("../models");

exports.addAddress = async (req, res) => {
  const user_id = req.user.user_id;
  const {
    addressLine1: address_line1,
    addressLine2: address_line2,
    city,
    state,
    zipCode: zip_code,
    country,
  } = req.body;
  try {
    const address = await Address.build({
      user_id,
      address_line1,
      address_line2,
      city,
      state,
      zip_code,
      country,
    });

    await address.save();

    res.json({ success: "Address Saved Successfully!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.getAllAddresses = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const addresses = await Address.findAll({
      where: {
        user_id,
      },
      attributes: { exclude: ["user_id"] },
    });

    res.json(addresses);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.deleteAddress = async (req, res) => {
  const address_id = req.params.address_id;
  try {
    const address = await Address.findByPk(address_id);
    if (!address) throw new Error("Address not found");
    await address.destroy();
    res.json({ success: "Address deleted successfully!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
