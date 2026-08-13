const express = require("express");
const path = require("node:path");
const PORT = process.env.PORT || 3000;

const app = express();
const indexRouter = require("./routes/indexRouter");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Listening on the Port ${PORT}!`);
});
