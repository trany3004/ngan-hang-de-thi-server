const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    ten: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
  })

module.exports = mongoose.model('monhoc', schema, 'monhoc')
