const express = require("express");
const passport = require("passport");
const session = require("express-session");
const path = require("node:path");
const configurePassport = require("./config/passport");

const PORT = process.env.PORT || 3000;

const app = express();
const indexRouter = require("./routes/indexRouter");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  }),
);

configurePassport(passport);
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).render("invalid", {
      errors: [{ msg: err.message }],
      status: err.statusCode,
      name: err.name,
    });
  } else {
    console.error(err);

    res.status(500).render("invalid", {
      errors: [{ msg: "Something went wrong!" }],
      status: 500,
      name: "InternalServerError",
    });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Listening on the Port ${PORT}!`);
});
