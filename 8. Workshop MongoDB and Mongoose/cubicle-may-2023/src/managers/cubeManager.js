const uniqid = require("uniqid");
const cubesFile = require("../db.json");
const cubes = cubesFile.cubes;

exports.getOne = (cubeId) => cubes.find((x) => x.id == cubeId);
exports.getAll = (search, from, to) => {
  let result = cubes.slice();
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
exports.create = (cubeData) => {
  const newCube = {
    id: uniqid(),
    ...cubeData,
  };

  cubes.push(newCube);

  return newCube;
};
