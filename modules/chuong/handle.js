const logger = require("../logger");
const crypto = require("../crypto");
const Chuong = require("../model/chuong");

const create = async (name) => {
  try {
    const res = await new Chuong({
      ten: name
    }).save();
    return await Chuong.findById(res._id);
  } catch (error) {
    logger.error("Create chuong error: ", error);
    return null;
  }
};

const update = async (id, data) => {
  
  const monhoc = await Chuong.findById(id);
  if (!monhoc) {
    throw "Monhoc does not exist";
  }

  await Chuong.findOneAndUpdate({ _id: id }, data);
  return await Chuong.findById(id);
};

const getList = async () => {
  try {
    return await Chuong.find();
  } catch (error) {
    logger.error("Lay danh sach mon hoc: ", error);
    return [];
  }
};
const deleteChuong = async (id) => {
  const monhoc = await Chuong.findById(id);
  if (!monhoc) {
    throw "MonHoc khong ton tai";
  }
  await Chuong.findByIdAndDelete(id);
};

module.exports = {
  deleteChuong, create, update, getList
};
