const router = require("express").Router();
const furnitureManager = require("../managers/furnitureManager");

router.get("/", async (req, res) => {
  // TODO: trycatch
  const furnitures = await furnitureManager.getAll();
  console.log(furnitures);
  res.json(furnitures);
});

router.post("/", async (req, res) => {
  try {
    await furnitureManager.create({ ...req.body, _ownerId: req.user._id });
    res.status(201).end();
  } catch (error) {
    res.status(400).json({
      message: "Cannot create furniture",
    });
  }
});
module.exports = router;
