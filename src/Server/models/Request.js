const mongoose = require('mongoose');
const {schema} = require('./Subject');
const Subject = require('./Subject');
const Offer =require('./Offer');
const requestScema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  subjects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Subject',
    required: true,
  },
  additionalInfo: {
    type: String,
    default: '',
  },
  offers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Offer',
    default: [],
  },
  timeSlots: {
    type: [String],
  },
  lessonLength: {
    type: Number,
  },
});
module.exports = mongoose.model('Request', requestScema);
