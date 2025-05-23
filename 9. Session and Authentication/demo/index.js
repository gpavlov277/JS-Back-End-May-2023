const express = require("express");
const { v4: uuid } = require("uuid");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("./lib/jwt-util");
const secret = "alabalasecret";

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
const users = {};

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/login", (req, res) => {
  res.send(`  <h1>Login page</h1><form method="POST">
  <label for="username"></label>
  <input type="text" name="username" id="username" />
  <label for="password"></label>
  <input type="password" name="password" id="password" />
  <input type="submit" value="Login" />
</form>
`);
});
app.get("/Register", (req, res) => {
  res.send(`<h1>Register page</h1><form method="POST">
  <label for="username"></label>
  <input type="text" name="username" id="username" />
  <label for="password"></label>
  <input type="password" name="password" id="password" />
  <input type="submit" value="Register" />
</form>
`);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  users[username] = {
    password: hash,
  };
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const isValid = await bcrypt.compare(password, users[username]?.password);
  if (isValid) {
    try {
      const payload = { username };
      const token = await jwt.sign(payload, secret, { expiresIn: "2d" });
      res.cookie("token", token);
      res.redirect("/profile");
    } catch (error) {
      console.log(err);
      res.redirect("/404");
    }
  } else {
    res.status(401).send("Login error");
  }
});

app.get("/profile", async (req, res) => {
  // Get token from cookie
  const token = req.cookies["token"];

  if (token) {
    try {
      const payload = await jwt.verify(token, secret);
      return res.send("Profile: " + payload.username);
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  } else {
    return res.redirect("/login");
  }

  // Verify token
});
app.listen(5000, () => console.log("Server is ilistening on port 5000..."));
