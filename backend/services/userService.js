const userRepo = require("../repositories/userRepository");

const getProfile = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) throw { status: 404, message: "User not found" };
  return user;
};

const updateProfile = async (userId, { fullName, phone, avatar }) => {
  const user = await userRepo.findByIdRaw(userId);
  if (!user) throw { status: 404, message: "User not found" };

  if (fullName !== undefined) user.fullName = fullName;
  if (phone    !== undefined) user.phone    = phone;
  if (avatar   !== undefined) user.avatar   = avatar;

  const updated = await userRepo.saveUser(user);
  return {
    _id:      updated._id,
    username: updated.username,
    email:    updated.email,
    fullName: updated.fullName,
    phone:    updated.phone,
    avatar:   updated.avatar,
  };
};

const changePassword = async (userId, { oldPassword, newPassword }) => {
  if (!oldPassword || !newPassword) {
    throw { status: 400, message: "Old and new password are both required" };
  }

  const user = await userRepo.findByIdRaw(userId);
  if (!user) throw { status: 404, message: "User not found" };

  const match = await user.matchPassword(oldPassword);
  if (!match) throw { status: 401, message: "Current password is incorrect" };

  user.password = newPassword;
  await userRepo.saveUser(user);
  return { message: "Password updated successfully" };
};

module.exports = { getProfile, updateProfile, changePassword };
