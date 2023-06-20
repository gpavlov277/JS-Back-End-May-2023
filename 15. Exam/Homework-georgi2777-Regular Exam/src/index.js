const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { auth } = require("./middlewares/authMiddleware");

const app = express();

// TODO: change db name
mongoose
  .connect(`mongodb://127.0.0.1:27017/friendly-world`)
  .then(() => console.log("DB Connected successfuly!"))
  .catch((err) => console.log("DB error", err.message));

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

app.listen(3000, console.log("Listening on port 3000..."));
