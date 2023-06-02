const express = require("express");

const expressConfig = require("./config/expressConfig.js");
const handlebarsConfig = require("./config/handlebarsConfig.js");
const homeController = require("./controllers/homeController.js");
const cubeController = require("./controllers/cubeController.js");
const dbConnect = require("./config/dbConfig.js");

const app = express();
const PORT = 3000;

expressConfig(app);
handlebarsConfig(app);

app.use(homeController);
app.use("/cubes", cubeController);

app.get("*", (req, res) => {
  res.redirect("/404");
});

dbConnect()
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log("DB Error", err);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
