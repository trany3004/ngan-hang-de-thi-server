const logger = require("../logger");
const crypto = require("../crypto");
const User = require("../model/user");

const createUser = async (data) => {
  try {
    data.password = crypto.encrypt(String(data.password));
    if (!data.role) data.role = "user";
    const res = await new User(data).save();
    return await User.findById(res._id).select("-password");
  } catch (error) {
    logger.error("Create user error: ", error);
    return null;
  }
};

const updateUser = async (id, data) => {
  delete data.id;
  delete data._id;
  delete data.username;
  if (data.password) {
    data.password = crypto.encrypt(String(data.password));
  }
  const user = await User.findById(id);
  if (!user) {
    throw "User does not exist";
  }

  await User.findOneAndUpdate({ _id: id }, data);
  return await User.findById(id).select("-password");
};

const getUser = async (id) => {
  try {
    return await User.findById(id).select("-password");
  } catch (error) {
    logger.error("get User: ", error);
    return null;
  }
};
const deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw "user doesnt exist";
  }
  await User.findByIdAndDelete(id);
};

const getUserByUsername = async (username) => {
  try {
    return await User.findOne({ username: username }).lean();
  } catch (error) {
    logger.error("get User: ", error);
    return null;
  }
};

module.exports = {
  createUser,
  updateUser,
  getUser,
  deleteUser,
  getUserByUsername,
};
