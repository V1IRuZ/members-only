const { Router } = require("express");
const controller = require("../controllers/indexController");
const indexRouter = Router();
const requireUnregistered = require("../middleware/requireUnregistered");

indexRouter.get("/", controller.getHome);
indexRouter.post("/log-in", controller.postLogIn);
indexRouter.get("/log-out", controller.getLogOut);
indexRouter.get("/sign-up", requireUnregistered, controller.getSignUp);
indexRouter.post("/sign-up", controller.postSignUp);

module.exports = indexRouter;
