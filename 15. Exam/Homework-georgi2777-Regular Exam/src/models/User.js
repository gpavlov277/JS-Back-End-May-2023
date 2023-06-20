const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password field is required!"],
    minLength: [4, "Password shoud be at least 4 characters long!"],
  },
  email: {
    type: String,
    required: [true, "Email address field is required!"],
    minLength: [10, "Email shoud be at least 10 characters long!"],
  },
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (this.password !== value) {
    throw new Error("Password missmatch!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
