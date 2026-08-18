const bcrypt = require("bcryptjs");
const { validationResult, matchedData } = require("express-validator");
const validateSignUp = require("../validators/signUpValidator");
const User = require("../models/User");

function getHome(req, res) {
  res.render("index");
}

function getSignUp(req, res) {
  res.render("sign-up", { errors: null });
}

const postSignUp = [
  validateSignUp,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", { errors: errors.array() });
    }

    try {
      const { firstname, lastname, username, password, confirmPassword } =
        matchedData(req);

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.insertUser(firstname, lastname, username, hashedPassword);

      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];

module.exports = {
  getHome,
  getSignUp,
  postSignUp,
};
