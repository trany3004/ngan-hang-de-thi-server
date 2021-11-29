const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    diaChi: {
        type: String
    }
}, {
    timestamps: true
  })

module.exports = mongoose.model('user', schema, 'user')
