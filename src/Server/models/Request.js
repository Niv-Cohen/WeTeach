const mongoose = require('mongoose');
const { schema } = require('./Subject');
const Subject = require('./Subject');
const Offer =require('./Offer')
const requestScema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    subjects:[String],
    additionalInfo:{
        type:String,
        default:""
    },
    offers: { 
        type:[mongoose.Schema.Types.ObjectId],
        ref:'offer',
        default:[]
    },
    timeSlots:{
        type:[String]
    }
})
module.exports = mongoose.model('request',requestScema);