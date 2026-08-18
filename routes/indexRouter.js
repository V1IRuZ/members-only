const { Router } = require("express");
const controller = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", controller.getHome);
indexRouter.get("/sign-up", controller.getSignUp);
indexRouter.post("/sign-up", controller.postSignUp);

module.exports = indexRouter;
