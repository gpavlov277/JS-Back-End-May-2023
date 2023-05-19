const express = require("express");
const path = require("path");
const app = express();

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
  res.send(`<a href = "/download" target="_blank">Hello Expres.js!</a>`);
});
app.get("/cats", (req, res) => {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/css/style.css"/>
      <title>Document</title>
  </head>
  <body>
      <h1>Hello World</h1>
  </body>
  </html>`);
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
app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(3000, () => console.log("Server is listening on port 3000..."));
