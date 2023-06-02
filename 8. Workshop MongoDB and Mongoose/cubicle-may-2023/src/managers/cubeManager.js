const uniqid = require("uniqid");
const cubesFile = require("../db.json");
const cubes = cubesFile.cubes;

const Cube = require("../models/Cube");

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.getAll = async (search, from, to) => {
  //TODO: use mongoose to filter in the tb
  let result = await Cube.find().lean();
  if (search) {
    result = result.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (from) {
    result = result.filter((x) => x.difficultyLevel >= Number(from));
  }

  if (to) {
    result = result.filter((x) => x.difficultyLevel <= Number(to));
  }
  return result;
};
exports.create = async (cubeData) => {
  const cube = new Cube(cubeData);

  await cube.save();
  return cube;
};
