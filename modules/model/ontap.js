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

    cauhoi: [{
        type: Schema.Types.ObjectId,
        ref: 'cauhoi'
    }],
  
}, {
    timestamps: true
  })

module.exports = mongoose.model('ontap', schema, 'ontap')
