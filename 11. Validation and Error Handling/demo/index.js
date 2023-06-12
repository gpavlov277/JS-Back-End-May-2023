const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`<form>
  <label for="name"></label>
  <input type="text" name="name" id="name">

  <label for="age"></label>
  <input type="text" name="age" id="age">

  <input type="submit" value="Submit">
</form>`);
});

app.listen(3000, () => console.log("Server is listening on port 3000..."));
