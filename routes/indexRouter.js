const { Router } = require("express");
const controller = require("../controllers/indexController");
const indexRouter = Router();
const requireUnregistered = require("../middleware/requireUnregistered");
const requireAuth = require("../middleware/requireAuth");

indexRouter.get("/", controller.getHome);
indexRouter.post("/log-in", controller.postLogIn);
indexRouter.get("/log-out", controller.getLogOut);
indexRouter.get("/sign-up", requireUnregistered, controller.getSignUp);
indexRouter.post("/sign-up", controller.postSignUp);
indexRouter.get("/membership", requireAuth, controller.getMembership);
indexRouter.post("/membership", controller.postMembership);

module.exports = indexRouter;
