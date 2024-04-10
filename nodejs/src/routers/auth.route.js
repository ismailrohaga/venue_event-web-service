const router = require("express").Router();

const { requestValidator } = require("../utils");
const { authController } = require("../controllers");
const { authValidator } = require("../validators");
const { authMiddleWare } = require("../middleware");

router
  .get("/profile", authMiddleWare, authController.getProfile)
  .post("/login", requestValidator(authValidator.Login), authController.login)
  .post(
    "/register",
    requestValidator(authValidator.Register),
    authController.register
  )
  .post("/logout", authMiddleWare, authController.logout);

module.exports = router;
