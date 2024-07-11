const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const {
    name,
    email,
    password: password_hash,
    phoneNumber: phone_number,
    isAdmin: is_admin,
  } = req.body;

  try {
    const user = await User.build({
      name: name,
      email: email,
      password_hash,
      phone_number,
      is_admin,
    });

    await user.save();
    const token = user.genAuthToken();
    res.status(201).json({ token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User not found!");

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) throw new Error();

    user.is_logged_in = true;

    await user.save();

    const token = user.genAuthToken();

    res.json({ token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = req.user;

    user.is_logged_in = false;

    await user.save();

    res.json({ message: "You've been logged out!" });
  } catch (e) {
    res.status(500).json({ error: "Couldn't logout" });
  }
};

exports.getUser = (req, res) => {
  res.json(req.user);
};
