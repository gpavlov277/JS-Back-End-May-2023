const router = require("express").Router();
const photoManager = require("../managers/photoManager");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/profile", async (req, res) => {
  const photos = await photoManager
    .getByOwner(req.user._id)
    .populate("owner")
    .lean();
  const userImage = photos[0]?.owner.image;

  res.render("profile", { photos, photoCount: photos.length, userImage });
});
router.get("/404", (req, res) => {
  res.render("404");
});
module.exports = router;
