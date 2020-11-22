
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {type: String, default: ''},
  institute: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'institute',
  },
  Degree: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Degree',
    default: [],
  },
  coursesITake: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Course',
    default: [],
  },
  coursesITeach: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Course',
    default: [],
  },
  subjectsIHelp: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Subject',
    default: [],
  },
  img: {
    type: String,
    default: '',
  },
  about:
    {type: String,
      default: '',
    },
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt)=>{
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash)=>{
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;

  return new Promise((resolve, reject)=>{
    bcrypt.compare(candidatePassword, user.password, (err, isMatch)=>{
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      } else {
        return resolve(true);
      }
    });
  });
};

module.exports = mongoose.model('User', userSchema);
