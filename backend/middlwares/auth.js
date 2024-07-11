const { User } = require("../models");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const bearerToken = req.header("Authorization");
    if (!bearerToken) throw new Error("Token is empty !");
    const token = bearerToken.replace("Bearer ", "");
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.user_id);

    const url = req.protocol + "://" + req.get("host") + req.originalUrl;

    if (!user) throw new Error("User not found");

    if (user.is_logged_in === false) throw new Error("Unauthorized");

    // req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

module.exports = auth;
