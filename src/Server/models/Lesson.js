const mongoose = require('mongoose');
const Offer =require('./Offer');

const lessonSchema = mongoose.Schema({
  tutorId: {
    type: String,
    required: true,
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'request',
    default: [],
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'offer',
  },
  status: {
    type: String,
    default: 'scheduled',
  },
});

module.exports = mongoose.model('Lesson', lessonSchema);
