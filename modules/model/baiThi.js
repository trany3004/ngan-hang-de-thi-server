const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    hocsinh: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    deThi: {
      type: Schema.Types.ObjectId,
      ref: "deThi",
    },
    thoiGianNopBai: {
      type: Number,
    },
    danhSachBaiLam: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("baiThi", schema, "baiThi");
