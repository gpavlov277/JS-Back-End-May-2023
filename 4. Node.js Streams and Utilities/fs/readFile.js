const fs = require("fs");

const input = fs.readFile("./input.txt", { encoding: "utf-8" }, (err, text) => {
  console.log(text);
});

console.log("end");
