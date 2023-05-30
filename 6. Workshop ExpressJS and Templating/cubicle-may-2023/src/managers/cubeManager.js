const uniqid = require("uniqid");
const cubes = [];

exports.getOne = (cubeId) => cubes.find((x) => x.id == cubeId);
exports.getAll = () => cubes.slice();
exports.create = (cubeData) => {
  const newCube = {
    id: uniqid(),
    ...cubeData,
  };

  cubes.push(newCube);

  return newCube;
};
