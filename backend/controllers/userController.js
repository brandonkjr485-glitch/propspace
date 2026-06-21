const userService = require("../services/userService");

const getProfile = async (req, res) => {
  try {
    const result = await userService.getProfile(req.user._id);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const result = await userService.updateProfile(req.user._id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const result = await userService.changePassword(req.user._id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
  }
};

module.exports = { getProfile, updateProfile, changePassword };
