function requireAdmin(req, res, next) {
  if (req.user.role < 2) {
    return res.redirect("/");
  }

  next();
}

module.exports = requireAdmin;
