const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const User = require("../models/User");

const { secret, TOKEN_KEY } = require("../config/config");

exports.login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid username or password!");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid username or password!");
  }

  const token = await generateToken(user);
  return token;
};

exports.register = async (userData) => {
  const user = await User.findOne({ username: userData.username });
  if (user) {
    throw new Error("Username already exists");
  }
  const createdUser = await User.create(userData);

  const token = await generateToken(createdUser);

  return token;
};

async function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  const token = await jwt.sign(payload, secret, { expiresIn: "2d" });

  return token;
}
