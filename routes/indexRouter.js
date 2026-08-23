const { Router } = require("express");
const controller = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", controller.getHome);
indexRouter.post("/log-in", controller.postLogIn);
indexRouter.get("/log-out", controller.getLogOut);
indexRouter.get("/sign-up", controller.getSignUp);
indexRouter.post("/sign-up", controller.postSignUp);

module.exports = indexRouter;
