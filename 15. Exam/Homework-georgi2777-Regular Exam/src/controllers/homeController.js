const router = require("express").Router();
const animalManager = require("../managers/animalManager");

router.get("/", async (req, res) => {
  let lastAnimals = await animalManager.findLast3().lean();
  lastAnimals = lastAnimals.slice(-3);
  res.render("home", { lastAnimals });
});

router.get("/search", async (req, res) => {
  res.render("search");
});
router.post("/search", async (req, res) => {
  let { location } = req.body;
  location = location.toLowerCase();
  let foundAnimals = await animalManager.getAll().lean();
  foundAnimals = foundAnimals.filter((x) =>
    x.location.toLowerCase().includes(location)
  );
  res.render("search", { foundAnimals });
});

router.get("/404", (req, res) => {
  res.render("404");
});
module.exports = router;
