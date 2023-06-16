const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required!"],
    // minLength: [2, "Name should be at least 2 characters"],
  },
  image: {
    type: String,
    required: true,
    // match: [/^https?:\/\//, "Invalid image URL"],
  },
  age: {
    type: Number,
    required: true,
    // min: [1, "Enter age between 1 and 100
    // max: [100, "Enter age between 1 and 100"],
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
      },

      message: {
        type: String,
        required: [true, "Comment message is required!"],
      },
    },
  ],
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
