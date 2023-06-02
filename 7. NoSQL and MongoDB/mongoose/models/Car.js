const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, "Car make is required!"],
    minLength: 3,
    maxLength: 20,
  },
  model: String,
  horsepower: Number,
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;
