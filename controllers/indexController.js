const bcrypt = require("bcryptjs");
const passport = require("passport");
const { validationResult, matchedData } = require("express-validator");
const validateLogIn = require("../validators/logInValidator");
const validateSignUp = require("../validators/signUpValidator");
const User = require("../models/User");

function getHome(req, res) {
  res.render("index", { errors: null });
}

const postLogIn = [
  validateLogIn,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        errors: errors.array(),
      });
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  }),
];

function getLogOut(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
}

function getSignUp(req, res) {
  res.render("sign-up", {
    firstname: "",
    lastname: "",
    username: "",
    errors: null,
  });
}

const postSignUp = [
  validateSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const values = matchedData(req);

      return res.status(400).render("sign-up", {
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        errors: errors.array(),
      });
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
  postLogIn,
  getLogOut,
  getSignUp,
  postSignUp,
};
