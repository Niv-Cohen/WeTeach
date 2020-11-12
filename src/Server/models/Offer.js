const mongoose = require('mongoose');
const { schema } = require('./Subject');


const offerSchema = mongoose.Schema({
    tutorId:{
        type:String,
        required:true
          },
    price:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('offer',offerSchema);