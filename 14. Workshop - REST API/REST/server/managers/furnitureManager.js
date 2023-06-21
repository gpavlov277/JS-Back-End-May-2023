const Furniture = require("../models/Furniture");

exports.create = (furnitureData) => Furniture.create(furnitureData);

exports.getAll = async (qs) => {
  let query = Furniture.find();

  if (qs.where) {
    let [fieldName, ownerId] = qs.where.split("=");
    ownerId = ownerId.replaceAll('"', "");
    query = query.where("ownerId").equals(ownerId);
  }
  const result = await query;
  return result;
};

exports.getOne = (furnitureId) => Furniture.findById(furnitureId);

exports.update = (furnitureId, furnitureData) =>
  Furniture.findByIdAndUpdate(furnitureId, furnitureData);

exports.delete = (furnitureId) => Furniture.findByIdAndDelete(furnitureId);
