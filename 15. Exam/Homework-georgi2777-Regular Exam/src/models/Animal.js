const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required!"],
    minLength: [2, "Name must be at least 2 characters long!"],
  },
  years: {
    type: Number,
    required: [true, "Years field is required!"],
    min: [1, "Age must be between 1 and 100"],
    max: [100, "Age must be between 1 and 100"],
  },
  kind: {
    type: String,
    required: [true, "Kind field is required!"],
    minLength: [3, "Kind must be at least 3 characters long!"],
  },
  image: {
    type: String,
    required: [true, "Image field is required!"],
    match: [/^https?:\/\//, "Invalid image URL"],
  },
  need: {
    type: String,
    required: [true, "Need field is required!"],
    minLength: [3, "Need must be at least 3 characters long!"],
    maxLength: [20, "Need must be maximum 20 characters long!"],
  },
  location: {
    type: String,
    required: [true, "Location field is required!"],
    minLength: [5, "Location must be at least 3 characters long!"],
    maxLength: [15, "Location must be maximum 20 characters long!"],
  },
  description: {
    type: String,
    required: [true, "Description field is required!"],
    minLength: [5, "Description must be at least 3 characters long!"],
    maxLength: [50, "Description must be maximum 20 characters long!"],
  },
  donations: [{ type: String, require: true }],
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
