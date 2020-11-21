const mongoose = require('mongoose');
const { schema } = require('./Subject');
const Subject = require('./Subject');
const Request= require('./Request');
const Lesson =require('./Lesson');
const Offer =require('./Offer');

const CenterScema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    requests:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Request',
        default:[]
    },
    futureTutorLessons:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Lesson',
        default:[]
    },
    futureStudentLessons:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Lesson',
        default:[]
    },
    studentLessonHistory:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Lesson',
        default:[]
    },
    tutorLessonHistory:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Lesson',
        default:[]
    },
    offersSent:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Offer',
        default:[]
    },
    conceptTaught:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Offer',
        default:[]
    }
})

module.exports = mongoose.model('ActionCenter',CenterScema);