const fs = require("fs");

const readStream = fs.createReadStream("./input.txt");
const writeStream = fs.createWriteStream("./output.txt");

readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});

writeStream.on("end", () => {
  writeStream.end();
});
