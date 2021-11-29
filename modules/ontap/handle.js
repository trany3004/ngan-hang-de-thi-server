const logger = require("../logger");
const crypto = require("../crypto");
const CauHoi = require("../model/cauhoi");
const ChuDe = require("../model/chude");
const OnTap = require("../model/ontap");
const {shuffle} = require("../common/common");

const create = async (data) => {
  try {
    if (!data) throw "Dữ liệu không hợp lệ";
    if (!data.mucDo || !data.chude || !data.cauhoi)
      throw "Dữ liệu không hợp lệ";
    const chude = await ChuDe.findById(data.chude);
    if (!chude) throw "Chủ đề không tồn tại";
    const res = await new OnTap(data).save();
    return await OnTap.findById(res._id);
  } catch (error) {
    logger.error("Create mon hoc error: ", error);
    throw error;
  }
};

const update = async (id, data) => {
  const ontap = await OnTap.findById(id);
  if (!ontap) {
    throw "Câu hỏi không tồn tại";
  }
  if (data.chude) {
    const chude = await ChuDe.findById(data.chude);
    if (!chude) throw "Chủ đề không tồn tại";
  }
  await OnTap.findOneAndUpdate({ _id: id }, data);
  return await OnTap.findById(id);
};

const getOnTap = async (query) => {
  if (query.mucDo) query.mucDo = Number(query.mucDo)
  const rs = await OnTap.findOne(query)
    .populate({
      path: "chude",
      // Get friends of friends - populate the 'friends' array for every friend
      populate: [{ path: "monhoc" }, { path: "khoihoc" }, { path: "chuong" }],
    })
    .populate("cauhoi");
  return rs;
};

const deleteObject = async (id) => {
  const ontap = await OnTap.findById(id);
  if (!ontap) {
    throw "Khong ton tai";
  }
  await OnTap.findByIdAndDelete(id);
};

const createRandomQuestion = async (body) => {
  const {mucDoList, chude} = body;
  const cauHoiList  = await Promise.all(mucDoList.map(({mucDo}) => CauHoi.find({
    chude: chude,
    mucDo: Number(mucDo)
  })))
  const rs = mucDoList.map((mucDo, index) => {
    const cauHoiShuffle = shuffle(cauHoiList[index]);
    return cauHoiShuffle.slice(0, mucDo.soLuong);
  })
  return rs
}

module.exports = {
  create,
  update,
  deleteObject,
  getOnTap,
  createRandomQuestion
};
