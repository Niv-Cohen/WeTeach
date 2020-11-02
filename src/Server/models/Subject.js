const mongoose = require('mongoose');

const subjectScema = mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    courseId:{
        type:String,
        required:true
    },
    subs:{
        type:[String]
    }
})

module.exports = mongoose.model('Subject',subjectScema);