const logger = require("../logger");
const crypto = require("../crypto");
const CauHoi = require("../model/cauhoi");
const ChuDe = require("../model/chude");
const { shuffle } = require("../common/common");

const create = async (data) => {
  try {
    if (!data) throw "Dữ liệu không hợp lệ";
    if (
      !data.mucDo ||
      !data.chude ||
      !data.cauhoi ||
      !data.dapAn ||
      !data.dapAnDung ||
      data.isDrapDrop === undefined
    )
      throw "Dữ liệu không hợp lệ";
    const chude = await ChuDe.findById(data.chude);
    if (!chude) throw "Chủ đề không tồn tại";
    data.monhoc = chude.monhoc;
    data.khoihoc = chude.khoihoc;
    data.chuong = chude.chuong;
    data.multipleAnswer =
      data.dapAnDung && data.dapAnDung.length > 1 ? true : false;
    const res = await new CauHoi(data).save();
    return await CauHoi.findById(res._id);
  } catch (error) {
    logger.error("Create mon hoc error: ", error);
    throw error;
  }
};

const update = async (id, data) => {
  const cauHoi = await CauHoi.findById(id);
  if (!cauHoi) {
    throw "Câu hỏi không tồn tại";
  }
  if (data.chude) {
    const chude = await ChuDe.findById(data.chude);
    if (!chude) throw "Chủ đề không tồn tại";
    data.monhoc = chude.monhoc;
    data.khoihoc = chude.khoihoc;
    data.chuong = chude.chuong;
  }
  if (data.dapAn) {
    data.multipleAnswer = data.dapAn && data.dapAn.length > 1 ? true : false;
  }
  await CauHoi.findOneAndUpdate({ _id: id }, data);
  return await CauHoi.findById(id);
};

const getList = async (query, perPage, page) => {
  try {
    return await CauHoi.find(query)
      .populate({
        path: "chude",
        // Get friends of friends - populate the 'friends' array for every friend
        populate: [{ path: "monhoc" }, { path: "khoihoc" }, { path: "chuong" }],
      })
      .limit(perPage)
      .skip(perPage * page);
  } catch (error) {
    logger.error("Lay danh sach mon hoc: ", error);
    return [];
  }
};
const count = async (query) => {
  return await CauHoi.count(query);
};

const getCauHoi = async (id) => {
  return await CauHoi.findById(id).populate({
    path: "chude",
    // Get friends of friends - populate the 'friends' array for every friend
    populate: [{ path: "monhoc" }, { path: "khoihoc" }, { path: "chuong" }],
  });
};

const deleteObject = async (id) => {
  const monhoc = await CauHoi.findById(id);
  if (!monhoc) {
    throw "Câu hỏi khong ton tai";
  }
  await CauHoi.findByIdAndDelete(id);
};

const createRandomQuestion = async (chude, mucDo) => {
  const cauHoiList = await CauHoi.find({
    chude: chude,
    mucDo: Number(mucDo),
  }).select("-dapAnDung");
  const cauHoiShuffle = shuffle(cauHoiList);
  return cauHoiShuffle ? cauHoiShuffle[0] : null;
};

const submitAnswer = async (payload) => {
  const cauHoiDetail = await CauHoi.findById(payload.id).lean();
  if (!cauHoiDetail.isDrapDrop) {
    const dapAnSelected = payload.dapAn;
    cauHoiDetail.dapAn = cauHoiDetail.dapAn.map((dapAn) => {
      const dapAnObj = {
        noidung: dapAn,
      };
      const selected = dapAnSelected.includes(dapAn);
      const isRightAnswer = cauHoiDetail.dapAnDung.includes(dapAn);
      if (isRightAnswer) {
        dapAnObj.rightAnswer = true;
      }

      if (!isRightAnswer && selected) {
        dapAnObj.wrongAnswer = true;
      }
      dapAnObj.selected = selected;
      return dapAnObj;
    });
  } else {
    cauHoiDetail.dapAn = payload.dapAn.map((dapAn, index) => {
      const dapAnObj = {
        noidung: dapAn,
      };
      if (cauHoiDetail.dapAnDung[index] === dapAn) {
        dapAnObj.rightAnswer = true;
      } else {
        dapAnObj.wrongAnswer = true;
      }
      return dapAnObj
    });
  }
  return cauHoiDetail;
};

module.exports = {
  create,
  update,
  getList,
  getCauHoi,
  deleteObject,
  count,
  createRandomQuestion,
  submitAnswer,
};
