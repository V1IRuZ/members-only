function requireUnregistered(req, res, next) {
  if (req.user) {
    return res.redirect("/");
  }

  next();
}

module.exports = requireUnregistered;
