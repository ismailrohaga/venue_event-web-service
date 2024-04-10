const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.use("/auth", require("./auth.route"));

module.exports = router;
