const mongoose = require('mongoose');
const { schema } = require('./Subject');
const Subject = require('./Subject');
const courseShcema = new mongoose.Schema({
    engName:{
        type:String,
        required:true
    },
    hebName:{
        type:String
    },
    subjects:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Subject',
        default:[]
    },
    subs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User',
        default:[]
        
    },
    degree:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('Course',courseShcema);