const router = require("express").Router();
const cubeManager = require("../managers/cubeManager.js");
router.get("/create", (req, res) => {
  res.render("create");
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
  const cube = cubeManager.getOne(req.params.cubeId);
  if (!cube) {
    return res.redirect("/404");
  }
  res.render("details", cube);
});
module.exports = router;
