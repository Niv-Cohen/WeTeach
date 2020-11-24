const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const ActionCenter = require('../models/ActionCenter');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = new User({email, password});
    const userId= user._id;
    await user.save();
    const actionCenter = new ActionCenter({userId});
    await actionCenter.save();
    const token = jwt.sign({userId: user._id}, 'My_Secret_Key');
    res.send({token, user});
  } catch (err) {
    res.status(422).send(err.body);
  }
});

router.post('/signin', async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(422).send({error: 'Must provide email and password'});
  }
  const user =await User.findOne({email}) .populate({path: 'coursesITeach', model: 'Course', select: 'hebName engName _id',
})
.populate({path: 'coursesITake', model: 'Course',
  select: 'hebName engName _id subsjects',
  populate: {path: 'subjects', model: 'Subject', select: 'hebName engName'}})
.populate({path: 'subjectsIHelp', model: 'Subject', select: 'hebName engName _id'});
  if (!user) {
    return res.status(422).send({error: 'Invalid password or email'});
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
    res.send({token, user});
  } catch (err) {
    return res.status(422).send({error: 'Invalid password or email'});
  }
});
module.exports = router;
