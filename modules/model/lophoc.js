const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    khoihoc: 
    {
        type: Schema.Types.ObjectId
    },
    lop: {
        type: String,
        required: true
    },
    namHoc: {
        type: String,
        required: true
    },
}, {
    timestamps: true
  })

module.exports = mongoose.model('lophoc', schema, 'lophoc')
