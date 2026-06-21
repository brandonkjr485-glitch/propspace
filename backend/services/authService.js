const userRepo     = require("../repositories/userRepository");
const generateToken = require("../utils/generateToken");

const register = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw { status: 400, message: "Username, email and password are required" };
  }

  const emailTaken    = await userRepo.findByEmail(email);
  const usernameTaken = await userRepo.findByUsername(username);

  if (emailTaken)    throw { status: 400, message: "Email is already registered" };
  if (usernameTaken) throw { status: 400, message: "Username is already taken" };

  const user  = await userRepo.createUser({ username, email, password });
  const token = generateToken(user._id);

  return { _id: user._id, username: user.username, email: user.email, token };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 400, message: "Email and password are required" };
  }

  const user = await userRepo.findByEmail(email);
  if (!user || !(await user.matchPassword(password))) {
    throw { status: 401, message: "Invalid email or password" };
  }

  const token = generateToken(user._id);
  return { _id: user._id, username: user.username, email: user.email, token };
};

module.exports = { register, login };
