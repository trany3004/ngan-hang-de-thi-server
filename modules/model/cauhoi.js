const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    mucDo: {
        type: Number,
        required: true,
        enum: [1, 2, 3]
    },
    chude: 
        {
            type: Schema.Types.ObjectId,
            ref: 'chude'
        },
    monhoc: 
    {
        type: Schema.Types.ObjectId
    },
    khoihoc: 
    {
        type: Schema.Types.ObjectId
    },
    chuong: 
    {
        type: Schema.Types.ObjectId
    },
    cauhoi: {
        type: String,
        required: true
    },
    dapAn: [
    {
        type : String,

    }
    ],
    multipleAnswer: {
        type : Boolean
    },
    dapAnDung: [
        {
            type : String,
        }
    ],
    isDrapDrop: {
        type : Boolean
    },
    giaithich: {
        type : String
    }
}, {
    timestamps: true
  })

module.exports = mongoose.model('cauHoi', schema, 'cauHoi')
