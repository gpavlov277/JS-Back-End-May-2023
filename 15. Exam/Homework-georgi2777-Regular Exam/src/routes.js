const router = require("express").Router();
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const animalController = require("./controllers/animalControler");

router.use(homeController);
router.use("/users", userController);
router.use("/animals", animalController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
