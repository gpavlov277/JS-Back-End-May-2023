const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
const { auth } = require("./middlewares/authMiddleware");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/furnitures")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(auth);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // localhost:3000
//   res.setHeader("Access-Control-Allow-Methods", "*"); // OPTIONS, GET, POST, PUT, PATCH, DELETE
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   next();
// });

app.get("/", (req, res) => {
  res.send("Hello world REST API ");
});

app.use("", routes);

app.listen(3030, () => {
  console.log("RESTful server is listening on port 3030...");
});
