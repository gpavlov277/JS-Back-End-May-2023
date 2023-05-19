const express = require("express");
const path = require("path");
const app = express();
const handlebars = require("express-handlebars");
const { addCat, getCats } = require("./cats");

app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

// Add third party middleware
const bodyParser = express.urlencoded({ extended: false });
app.use(bodyParser);

// App middlewares
app.use((req, res, next) => {
  console.log(`HTTP Request ${req.method}:${req.path}`);
  next();
});
// Express Router / Actions
app.get("/", (req, res) => {
  // res.send(`<a href = "/download" target="_blank">Hello Expres.js!</a>`);
  res.render("home");
});
app.get("/cats", (req, res) => {
  res.render("cats", cats);
});

// Do not do this at home!
// app.get("/css/style.css", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public/css/style.css"));
// });

app.use(express.static("public"));
app.get("/download", (req, res) => {
  //   res.download("./test.pdf");
  //   res.attachment("./test.pdf");
  res.sendFile(path.resolve(__dirname, "test.pdf"));
});

app.get("/old-route", (req, res) => {
  res.redirect("/cats");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.post("/cats", (req, res) => {
  addCat(req.body.name, req.body.age);
  console.log(getCats);
  res.redirect("/");
});
app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});
app.listen(3000, () => console.log("Server is listening on port 3000..."));
