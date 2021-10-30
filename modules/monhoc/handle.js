const logger = require("../logger");
const crypto = require("../crypto");
const MonHoc = require("../model/monhoc");

const createMonHoc = async (name) => {
  try {
    const res = await new MonHoc({
      ten: name
    }).save();
    return await MonHoc.findById(res._id);
  } catch (error) {
    logger.error("Create mon hoc error: ", error);
    return null;
  }
};

const updateMonHoc = async (id, data) => {
  
  const monhoc = await MonHoc.findById(id);
  if (!monhoc) {
    throw "Monhoc does not exist";
  }

  await MonHoc.findOneAndUpdate({ _id: id }, data);
  return await MonHoc.findById(id);
};

const getListMonHoc = async () => {
  try {
    return await MonHoc.find();
  } catch (error) {
    logger.error("Lay danh sach mon hoc: ", error);
    return [];
  }
};
const deleteMonHoc = async (id) => {
  const monhoc = await MonHoc.findById(id);
  if (!monhoc) {
    throw "MonHoc khong ton tai";
  }
  await MonHoc.findByIdAndDelete(id);
};

module.exports = {
  deleteMonHoc, createMonHoc, updateMonHoc, getListMonHoc
};
