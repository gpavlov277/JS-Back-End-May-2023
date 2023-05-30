const router = require("express").Router();
const cubeManager = require("../managers/cubeManager.js");
router.get("/create", (req, res) => {
  res.render("create");
  console.log(cubeManager.getAll());
});
router.post("/create", (req, res) => {
  console.log(req.body);
  const { name, description, imageUrl, difficultyLevel } = req.body;
  cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel,
  });
  res.redirect("/");
});
router.get("/:cubeId/details", (req, res) => {
  const cubeID = cubeManager.getOne(req.params.cubeId);
  res.render("details", cubeID);
});
module.exports = router;
