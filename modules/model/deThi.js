const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    thoiGianLamBai: {
      type: Number,
    },
    thoiGianBatDau: {
      type: Number,
    },
    tieuDe: {
      type: String,
    },
    listCauHoi: [
      {
        type: Schema.Types.ObjectId,
        ref: "cauHoi",
      },
    ],
    loaiDeThi: {
      type: String,
    },
    khoi: {
      type: Schema.Types.ObjectId,
      ref: "khoihoc"
    },
    lopHoc: {
      type: Schema.Types.ObjectId,
      ref: "lophoc"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("deThi", schema, "deThi");
