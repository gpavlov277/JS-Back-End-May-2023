const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (userData) => {
  const user = await User.create(userData);
  const result = getAuthResult(user);
  return result;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Invalid username or password!");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid username or password!");
  }

  const result = getAuthResult(user);
  return result;
};

function getAuthResult(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, "SECRET123", { expiresIn: "1d" }); // With SPA it is not good idea to use token longer than 10-20 minutes

  const result = {
    _id: user._id,
    email: user.email,
    accessToken: token,
  };

  return result;
}
