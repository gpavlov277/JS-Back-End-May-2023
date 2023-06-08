const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.register = (userData) => User.create(userData);

exports.login = async (username, password) => {
  // TODO: find user
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Cannot find username or password");
  }

  // TODO: validate password
  const isValid = bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Cannot find username or password");
  }

  // Return user
  return user;
};
