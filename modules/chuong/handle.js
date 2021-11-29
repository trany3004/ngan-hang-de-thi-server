const logger = require("../logger");
const crypto = require("../crypto");
const Chuong = require("../model/chuong");
const ChuDe = require("../model/chude");
const MonHoc = require("../model/monhoc");
const KhoiHoc = require("../model/khoihoc");

const create = async (data) => {
  try {
    if (!data.khoihoc) {
      throw 'Khối học là bắt buộc'
    }
    if (!data.monhoc) {
      throw 'Môn học là bắt buộc'
    }
    const monhoc = await MonHoc.findById(data.monhoc);
    if (!monhoc) {
      throw 'Môn học không tồn tại'
    }
    const khoihoc = await KhoiHoc.findById(data.khoihoc);
    if (!khoihoc) {
      throw 'Khối học không tồn tại'
    }
    data.monhoc = monhoc;
    data.khoihoc = khoihoc;
    console.log(data);
    const res = await new Chuong(data).save();
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
    return await Chuong.find().populate('monhoc').populate('khoihoc');;
  } catch (error) {
    logger.error("Lay danh sach mon hoc: ", error);
    return [];
  }
};

const getByMonHoc = async (monhocId) => {
  try {
    return await Chuong.find({monhoc: monhocId}).populate('monhoc').populate('khoihoc').chuong;
  } catch (error) {
    logger.error("Lay danh sach mon hoc: ", error);
    return [];
  }
};

const getByMonHocAndKhoiHoc = async (query) => {
  try {
    return await Chuong.find(query).populate('monhoc').populate('khoihoc').populate('chuong');
  } catch (error) {
    logger.error("Lay danh sach mon hoc: ", error);
    return [];
  }
};
const deleteChuong = async (id) => {
  const monhoc = await Chuong.findById(id);
  if (!monhoc) {
    throw "Chuong khong ton tai";
  }
  await Chuong.findByIdAndDelete(id);
  await ChuDe.deleteMany({
    chuong: id
  })
};

module.exports = {
  deleteChuong, create, update, getList, getByMonHoc, getByMonHocAndKhoiHoc
};
