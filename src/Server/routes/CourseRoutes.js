const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const ActionCenter = require('../models/ActionCenter');
const Request =require('../models/Request');
const Subject =require('../models/Subject');
const Course = require('../models/Course');
const User = require('../models/User');
const router = express.Router();

// add new course to api
router.post('/add', async (req, res)=>{
  const {hebName, engName, degree}=req.body;
  try {
    const subjects = await Subject.find({courseName: engName}).select('_id');
    const course=new Course({hebName, engName, subjects, degree});
    await course.save();
    res.send(course);
  } catch (err) {
    res.send(err.message);
  }
});
// subscribe to course
router.put('/subscribeToTeach', async (req, res)=>{
  const {courses, tutorId}=req.body;
  // subscribe to every course in the list
  try {
    courses.map(async (element)=>{
      await Course.updateOne({_id: element}, {$addToSet: {subs: tutorId}});
    });
    await User.updateOne({_id: tutorId}, {$addToSet: {coursesITeach: courses}});
    const user=await User.findById(tutorId);
    res.send({user});
  } catch (err) {
    return res.send(err.message);
  }
});

router.put('/subscribe', async (req, res)=>{
  const {courses, studentId}=req.body;
  // subscribe to every course in the list
  try {
    courses.map(async (element)=>{
      await Course.updateOne({hebName: element.hebName},
          {$addToSet: {subs: tutorId}});
    });
    await User.updateOne({_id: student}, {$addToSet: {coursesITake: courses}});
    const user=await User.findById(studentId);
    res.send({user});
  } catch (err) {
    return res.send(err.message);
  }
});


module.exports = router;
