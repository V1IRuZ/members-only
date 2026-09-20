const { Router } = require("express");
const passport = require("passport");
const controller = require("../controllers/indexController");
const indexRouter = Router();
const requireUnregistered = require("../middleware/requireUnregistered");
const requireAuth = require("../middleware/requireAuth");

indexRouter.get("/", controller.getHome);
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  }),
);
indexRouter.get("/log-out", controller.getLogOut);
indexRouter.get("/sign-up", requireUnregistered, controller.getSignUp);
indexRouter.post("/sign-up", requireUnregistered, controller.postSignUp);
indexRouter.get("/membership", requireAuth, controller.getMembership);
indexRouter.post("/membership", requireAuth, controller.postMembership);
indexRouter.get("/admin", requireAuth, controller.getAdmin);
indexRouter.post("/admin", requireAuth, controller.postAdmin);
indexRouter.get("/change-password", requireAuth, controller.getChangePassword);
indexRouter.post(
  "/change-password",
  requireAuth,
  controller.postChangePassword,
);
indexRouter.get("/{*splat}", controller.getInvalidRoute);

module.exports = indexRouter;
