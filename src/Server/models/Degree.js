const mongoose = require('mongoose');
const { schema } = require('./Subject');
const Subject = require('./Subject');
const degreeSchema = mongoose.Schema({
    engName:{
        type:String,
        unique:true,
        required:true
    },
    hebName:{
        type:String,
        unique:true
    },
    courses:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Course',
        default:[]
    },
    institute:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Degree',degreeSchema);