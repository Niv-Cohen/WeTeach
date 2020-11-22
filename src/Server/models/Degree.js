const mongoose = require('mongoose');
const degreeSchema = mongoose.Schema({
  engName: {
    type: String,
    required: true,
  },
  hebName: {
    type: String,

  },
  courses: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Course',
    default: [],
  },
  institute: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Degree', degreeSchema);
