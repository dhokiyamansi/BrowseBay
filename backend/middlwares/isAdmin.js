const isAdmin = (req, res, next) => {
  const user = req.user;

  if (user.is_admin === false)
    return res
      .status(401)
      .json({ error: "You're not authorized to access this page" });

  next();
};

module.exports = isAdmin;
