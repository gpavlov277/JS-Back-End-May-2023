const router = require("express").Router();
const { getErrorMessage } = require("../utils/errorHelpers");
const { isAuth } = require("../middlewares/authMiddleware");
const animalManager = require("../managers/animalManager");

router.get("/add", isAuth, (req, res) => {
  res.render("animals/create");
});

router.post("/add", isAuth, async (req, res) => {
  const animalData = {
    ...req.body,
    owner: req.user._id,
  };
  try {
    await animalManager.addAnimal(animalData);
    res.redirect("/animals/dashboard");
  } catch (error) {
    res.render("animals/create", { error: getErrorMessage(error) });
  }
});

router.get("/dashboard", async (req, res) => {
  const animals = await animalManager.getAll().lean();
  res.render("dashboard", { animals });
});

router.get("/:animalId/details", async (req, res) => {
  const animalId = req.params.animalId;
  const animal = await animalManager.getOne(animalId).lean();
  const isOwner = req.user?._id == animal.owner._id;
  const isDonated = animal.donations.find((x) => req.user?._id);

  res.render("animals/details", { animal, isOwner, isDonated });
});
router.get("/:animalId/delete", isAuth, async (req, res) => {
  const animalId = req.params.animalId;
  try {
    await animalManager.delete(animalId);
    res.redirect("/animals/dashboard");
  } catch (err) {
    res.render(`/animals/details`, {
      error: "Unsuccessful operation!s",
    });
  }
});

router.get("/:animalId/edit", isAuth, async (req, res) => {
  const animalId = req.params.animalId;
  const animal = await animalManager.getOne(animalId).lean();

  res.render("animals/edit", { animal });
});

router.post("/:animalId/edit", isAuth, async (req, res) => {
  const animalId = req.params.animalId;
  const animalData = req.body;

  try {
    await animalManager.edit(animalId, animalData);
    res.redirect(`/animals/${animalId}/details`);
  } catch (error) {
    res.render("animals/edit", {
      error: getErrorMessage(error),
      ...animalData,
    });
  }
});

router.get("/:animalId/donate", isAuth, async (req, res) => {
  const animalId = req.params.animalId;
  const animal = await animalManager.getOne(animalId).lean();
  if (!animal.donations.find((x) => req.user._id)) {
    animal.donations.push(req.user._id.toString());
    await animalManager.edit(animalId, animal);
  }

  res.redirect(`/animals/${animalId}/details`);
});

module.exports = router;
