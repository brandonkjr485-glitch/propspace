const User = require("../models/User");

const findByEmail    = (email)    => User.findOne({ email });
const findByUsername = (username) => User.findOne({ username });
const findById       = (id)       => User.findById(id).select("-password");
const findByIdRaw    = (id)       => User.findById(id); // includes password for comparison
const createUser     = (data)     => User.create(data);
const saveUser       = (user)     => user.save();

module.exports = { findByEmail, findByUsername, findById, findByIdRaw, createUser, saveUser };
