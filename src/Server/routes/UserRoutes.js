const express = require('express');
const User = require('../models/User');
const Course =require('../models/Course');
const Subject = require('../models/Subject');

const router = express.Router();

router.post('/:_id', async (req, res)=>{
  const {_id} =req.body;
  if (!_id) {
    res.status(433).send({error: `id was not recieved`});
  }
  const user = await User.findOne({_id})
      .populate({path: 'coursesITeach', model: 'Course', select: 'hebName engName _id',
      })
      .populate({path: 'coursesITake', model: 'Course',
        select: 'hebName engName _id subsjects',
        populate: {path: 'subjects', model: 'Subject', select: 'hebName engName'}})
      .populate({path: 'subjectsIHelp', model: 'Subject', select: 'hebName engName _id'});
  if (!user) {
    return res.status(422).send(`${id} wasn't found ` );
  }
  res.send({user});
});

router.put('/', async (req, res) => {
  const {_id, params} =req.body;
  const {about, img, coursesITeach, coursesITake, subjectsIHelp, fullName}=params;
  let coursesList =[];
  let user= await User.findOne({_id})
  if (user) {
    if (fullName) {
      user.name=fullName;
    }
    if (about) {
      user.about=about;
    }
    if (img) {
      user.img=img;
    }
    if (coursesITeach) {
      const {myCourses} = coursesITeach;
      try {
        for (const course of myCourses) {
          courseFound = await Course.findOne({hebName: course.hebName});
          if (courseFound) {
            courseFound.subs=[...courseFound.subs, _id];
            coursesList=[...coursesList, courseFound];
            courseFound.save();
          }
        }
        user.coursesITeach=coursesList;
      } catch (err) {
        return res.send(err.message);
      }
    } else if (coursesITake) {
      const {myCourses, myInstitute} = coursesITake;
      coursesList=[];
      // const inst =Institute.find({hebName:myInstitute.hebName});
      // user.institute=inst;
      try {
        for (const course of myCourses) {
          courseFound = await Course.findOne({hebName: course.hebName});
          if (courseFound) {
            coursesList=[...coursesList, courseFound];
          }
        }
        user.coursesITake=coursesList;
      } catch (err) {
        return res.send(err.message);
      }
      if (subjectsIHelp) {
        try {
          for (const subject of subjectsIHelp) {
            const subjects = await Subject.find({engName: subject.engName});
            for (const match of subjects) {
              match.subs=[...match.subs, _id];
              match.save();
              user.subjectsIHelp=[...user.subjectsIHelp, match];
            }
          }
        } catch (err) {
          return res.send(err.message);
        }
      }
    }
    await  user.save();
    user= await User.findOne({_id}).populate({path: 'coursesITeach', model: 'Course', select: 'hebName engName _id',})
    .populate({path: 'coursesITake', model: 'Course',
      select: 'hebName engName _id subsjects',
      populate: {path: 'subjects', model: 'Subject', select: 'hebName engName'}})
    .populate({path: 'subjectsIHelp', model: 'Subject', select: 'hebName engName _id'});
    return res.send({user});
  }
});


module.exports = router;
