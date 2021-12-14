const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    chude: 
        {
            type: Schema.Types.ObjectId,
            ref: 'chude'
        },

    cauhoi: [{
        type: Schema.Types.ObjectId,
        ref: 'cauHoi'
    }],
    time: {
        type: Number
    }
  
}, {
    timestamps: true
  })

module.exports = mongoose.model('ontap', schema, 'ontap')
