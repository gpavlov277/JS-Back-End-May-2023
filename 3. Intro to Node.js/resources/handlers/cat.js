const url = require("url");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const formidable = require("formidable");
const breeds = require("../data/breeds.json");
const cats = require("../data/cats.json");

module.exports = (req, res) => {
  const pathname = url.parse(req.url).pathname;
  if (pathname === "/cats/add-cat" && req.method === "GET") {
    let filePath = path.normalize(path.join(__dirname, "../views/addCat.html"));

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });
        res.write("404 Not Found");
        res.end();
        return;
      }
      let catBreedPlaceholder = breeds.map(
        (breed) => `<option value="${breed}">${breed}</option>`
      );

      let modifiedData = data
        .toString()
        .replace("{{catBreeds}}", catBreedPlaceholder);
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.write(modifiedData);
      res.end();
    });
    // TODO
  } else if (pathname === "/cats/add-breed" && req.method === "GET") {
    let filePath = path.normalize(
      path.join(__dirname, "../views/addBreed.html")
    );

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.log(err);
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });
        res.write("404 Not Found");
        res.end();
        return;
      }
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.write(data);
      res.end();
    });
  } else if (pathname === "/cats/add-breed" && req.method === "POST") {
    let formData = "";
    req.on("data", (data) => {
      formData += data;
    });
    req.on("end", (data) => {
      let body = qs.parse(formData);
      fs.readFile("./data/breeds.json", (err, data) => {
        if (err) {
          throw err;
        }
        let breeds = JSON.parse(data);
        breeds.push(body.breed);
        let json = JSON.stringify(breeds);
        fs.writeFile("./data/breeds.json", json, "utf-8", () =>
          console.log("The breed was added successful")
        );
      });
      res.writeHead(302, {
        location: "/",
      });
      res.end();
    });
  } else if (pathname === "/cats/add-cat" && req.method === "POST") {
    let form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) throw err;

      let oldPath = files.upload.filepath;
      let newPath = path.normalize(
        path.join(
          __dirname,
          "../content/images/" + files.upload.originalFilename
        )
      );
      console.log(oldPath, newPath);
      fs.copyFile(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log("File was uploaded successfuly");
      });
      fs.readFile("./data/cats.json", "utf-8", (err, data) => {
        if (err) throw err;

        let allCats = JSON.parse(data);
        allCats.push({
          id: data.length + 1,
          ...fields,
          image: files.upload.originalFilename,
        });
        let json = JSON.stringify(allCats);
        fs.writeFile("./data/cats.json", json, () => {
          res.writeHead(302, {
            location: "/",
          });
          res.end();
        });
      });
    });
  } else return true;
};
