const mongoose = require('mongoose');
const { schema } = require('./Subject');


const offerSchema = mongoose.Schema({
    tutor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
          },
    price:{
        type:Number,
        required:true
    },
    Date:{
        type:[String],
        required:true
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports = mongoose.model('Offer',offerSchema);