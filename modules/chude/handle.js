const logger = require("../logger");
const crypto = require("../crypto");
const ChuDe = require("../model/chude");
const MonHoc = require("../model/monhoc");
const KhoiHoc = require("../model/khoihoc");
const Chuong = require("../model/chuong");
const fs = require("fs");
const path = require("path");

const create = async (data) => {
  try {
    if (!data.khoihoc) {
      throw 'Khối học là bắt buộc'
    }
    if (!data.monhoc) {
      throw 'Môn học là bắt buộc'
    }
    if (!data.chuong) {
      throw 'chuong là bắt buộc'
    }
    const monhoc = await MonHoc.findById(data.monhoc);
    if (!monhoc) {
      throw 'Môn học không tồn tại'
    }
    const chuong = await Chuong.findById(data.chuong);
    if (!chuong) {
      throw 'Chuong không tồn tại'
    }
    const khoihoc = await KhoiHoc.findById(data.khoihoc);
    if (!khoihoc) {
      throw 'Khối học không tồn tại'
    }
    data.monhoc = monhoc;
    data.khoihoc = khoihoc;
    data.chuong = chuong;
    let res = await new ChuDe(data).save();
    let rs = await ChuDe.findById(res._id);
    if (data.file) {
      const extended = data.fileName.substring(data.fileName.lastIndexOf('.'));
      
      fs.writeFileSync(path.join(global.BASE_DIR, 'public', 'upload', `${rs._id}${extended}`), data.file.replace(/^data:image\/.{1,30};base64,/, ""), 'base64');
      rs.image = path.join('/upload', `${rs._id}${extended}`);
      rs = await rs.save();
    }
    return rs;
  } catch (error) {
    logger.error("Create khoi hoc error: ", error);
    return null;
  }
};

const update = async (id, data) => {
  
  const chuDe = await ChuDe.findById(id);
  if (!chuDe) {
    throw "Chủ đề không tồn tại";
  }

  if (data.monhoc) {
    const monhoc = await MonHoc.findById(data.monhoc);
    if (!monhoc) {
      throw 'Môn học không tồn tại'
    }
    chuDe.monhoc = monhoc;
  }
  if (data.chuong) {
    const chuong = await Chuong.findById(data.chuong);
    if (!chuong) {
      throw 'Chuong không tồn tại'
    }
    chuDe.chuong = chuong;
  }
  if (data.khoihoc) {
    const khoihoc = await KhoiHoc.findById(data.khoihoc);
    if (!khoihoc) {
      throw 'Khối học không tồn tại'
    }
    chuDe.khoihoc = khoihoc;
  }

  chuDe.noidung = data.noidung || chuDe.noidung;
  if (data.file) {
    const extended = data.fileName.substring(data.fileName.lastIndexOf('.'));
    
    fs.writeFileSync(path.join(global.BASE_DIR, 'public', 'upload', `${chuDe._id}${extended}`), data.file.replace(/^data:image\/.{1,30};base64,/, ""), 'base64');
    chuDe.image = path.join('/upload', `${chuDe._id}${extended}`);
  }
  await chuDe.save();
  return await ChuDe.findById(id);
};

const getList = async () => {
  try {
    return await ChuDe.find().populate('monhoc').populate('khoihoc');
  } catch (error) {
    logger.error("Lay danh sach mon hoc: ", error);
    return [];
  }
};
const getByMonHoc = async (monhocId) => {
  try {
    return await ChuDe.find({monhoc: monhocId}).populate('monhoc').populate('khoihoc').chuong;
  } catch (error) {
    logger.error("Lay danh sach mon hoc: ", error);
    return [];
  }
};

const getByMonHocAndKhoiHoc = async (query) => {
  try {
    return await ChuDe.find(query).populate('monhoc').populate('khoihoc').populate('chuong');
  } catch (error) {
    logger.error("Lay danh sach mon hoc: ", error);
    return [];
  }
};

const deleteKhoiHoc = async (id) => {
  const monhoc = await ChuDe.findById(id);
  if (!monhoc) {
    throw "MonHoc khong ton tai";
  }
  await ChuDe.findByIdAndDelete(id);
};

module.exports = {
  deleteKhoiHoc, create, update, getList, getByMonHoc, getByMonHocAndKhoiHoc
};
