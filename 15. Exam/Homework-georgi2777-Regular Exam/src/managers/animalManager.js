const Animal = require("../models/Animal");

exports.addAnimal = (animalData) => {
  Animal.create(animalData);
};

exports.getAll = () => Animal.find();

exports.getOne = (animalId) => Animal.findById(animalId); // TODO: POPULATE

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.edit = (animalId, animalData) =>
  Animal.findByIdAndUpdate(animalId, animalData);

exports.findLast3 = () => Animal.find();

exports.searchByLocation = (locationName) =>
  Animal.find({ location: locationName }).exec();
