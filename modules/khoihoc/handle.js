const logger = require("../logger");
const crypto = require("../crypto");
const KhoiHoc = require("../model/khoihoc");

const create = async (name) => {
  try {
    const res = await new KhoiHoc({
      ten: name
    }).save();
    return await KhoiHoc.findById(res._id);
  } catch (error) {
    logger.error("Create khoi hoc error: ", error);
    return null;
  }
};

const update = async (id, data) => {
  
  const monhoc = await KhoiHoc.findById(id);
  if (!monhoc) {
    throw "Monhoc does not exist";
  }

  await KhoiHoc.findOneAndUpdate({ _id: id }, data);
  return await KhoiHoc.findById(id);
};

const getList = async () => {
  try {
    return await KhoiHoc.find();
  } catch (error) {
    logger.error("Lay danh sach mon hoc: ", error);
    return [];
  }
};
const deleteKhoiHoc = async (id) => {
  const monhoc = await KhoiHoc.findById(id);
  if (!monhoc) {
    throw "MonHoc khong ton tai";
  }
  await KhoiHoc.findByIdAndDelete(id);
};

module.exports = {
  deleteKhoiHoc, create, update, getList
};
