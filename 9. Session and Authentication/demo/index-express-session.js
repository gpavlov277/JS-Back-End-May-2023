const express = require("express");
const { v4: uuid } = require("uuid");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const app = express();

app.use(cookieParser());
app.use(
  expressSession({
    secret: "my-express-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);
app.get("/", (req, res) => {
  let id = uuid();

  const userId = req.cookies["userId"];

  if (userId) {
    id = userId;
    console.log(req.session.secret);
  } else {
    req.session.secret = `${id} - some secret`;
    res.cookie("userId", id, { httpOnly: true });
  }

  res.send("Hello User - " + id);
});

app.listen(5000, () => console.log("Server is ilistening on port 5000..."));
