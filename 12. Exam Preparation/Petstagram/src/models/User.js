const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username field is required!"],
    unique: true,
    minLength: [2, "Username must be at least 3 symbols!"],
  },
  password: {
    type: String,
    required: [true, "Password field is required!"],
    minLength: [2, "Password must be at least 3 symbols!"],
  },
  email: {
    type: String,
    required: [true, "Email address field is required!"],
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
