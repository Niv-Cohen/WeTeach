const mongoose = require('mongoose');
const { schema } = require('./Subject');
const Subject = require('./Subject');
const courseScema = mongoose.Schema({
    id:{
        type:String,
        unique:true,
        required:true
    },
    subjects:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Subject',
        default:[]
    }
})

module.exports = mongoose.model('course',courseScema);