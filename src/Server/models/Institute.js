const mongoose = require('mongoose');
const instSchema =new mongoose.Schema({
  hebName: {
    type: String,
    unique: true,
    required: true,
  },
  engName: {
    type: String,
    unique: true,
    required: true,
  },
  degrees: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Degree',
    default: [],
  },
});

module.exports = mongoose.model('institute', instSchema);
