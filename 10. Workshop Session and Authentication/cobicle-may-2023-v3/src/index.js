const express = require("express");

const expressConfig = require("./config/expressConfig.js");
const handlebarsConfig = require("./config/handlebarsConfig.js");
const routes = require("./routes.js");
const dbConnect = require("./config/dbConfig.js");

const app = express();
const PORT = 3000;

expressConfig(app);
handlebarsConfig(app);

app.use(routes);

dbConnect()
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log("DB Error", err);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
