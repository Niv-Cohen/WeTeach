const mongoose = require('mongoose');

const subjectScema = mongoose.Schema({
    hebName:{
        type:String,
    },
    engName:{
        type:String,
    },
    subs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User',
        default:[]
    },
    courseName:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Subject',subjectScema);