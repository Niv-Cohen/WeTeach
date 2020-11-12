const mongoose = require('mongoose');
const { schema } = require('./Subject');
const Subject = require('./Subject');
const Request= require('./Request');
const Lesson =require('./Lesson');
const Offer =require('./Offer');
const CenterScema = mongoose.Schema({
    userId:{
        type:String,
        unique:true,
        required:true
    },
    requests:{
        type:[Request.schema],
        default:[]
    },
    futureTutorLessons:{
        type:[Lesson.schema],
        default:[]
    },
    futureStudentLessons:{
        type:[Lesson.schema],
        default:[]
    },
    studentLessonHistory:{
        type:[Lesson.schema],
        default:[]
    },
    tutorLessonHistory:{
        type:[Lesson.schema],
        default:[]
    },
    offersSent:{
        type:[Offer.schema],
        default:[]
    },
    conceptTaught:{
        type:[Offer.schema],
        default:[]
    }
})

module.exports = mongoose.model('ActionCenter',CenterScema);