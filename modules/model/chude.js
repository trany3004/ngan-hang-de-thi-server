const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    ten: {
        type: String,
        required: true
    },
    khoihoc: 
        {
            type: Schema.Types.ObjectId,
            ref: 'khoihoc'
        },
    monhoc: 
    {
        type: Schema.Types.ObjectId,
        ref: 'monhoc'
    },
    chuong: 
    {
        type: Schema.Types.ObjectId,
        ref: 'chuong'
    }
    
}, {
    timestamps: true
  })

module.exports = mongoose.model('chude', schema, 'chude')
