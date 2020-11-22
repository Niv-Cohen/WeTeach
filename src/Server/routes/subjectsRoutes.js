const express = require('express');
const Subject = require('../models/Subject');

const router = express.Router();

router.get('/', (req, res)=>{
  res.send('it works');
});

router.post(`/many`, async (req, res)=>{
  const {subjects}=req.body;
  try {
    subjects.map( async (element)=>{
      const {hebName, engName, courseName}=element;
      const subject =new Subject({hebName, engName, courseName});
      await subject.save();
    });
    res.send(subjects);
  } catch (err) {
    res.send(err.message);
  }
});


// subscribe to course
router.put('/subscribe', async (req, res)=>{
  const {subjects, userId}=req.body;
  // subscribe to every course in the list
  try {
    subjects.map(async (element)=>{
      await Subject.updateOne({_id: element}, {$addToSet: {subs: userId}});
    });
    await User.updateOne({_id: tutorId}, 
        {$addToSet: {subjectsIHelp: subjects}});
    res.send(await User.findById(userId));
  } catch (err) {
    return res.send(err.message);
  }
});


module.exports = router;
