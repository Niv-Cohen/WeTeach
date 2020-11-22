const express = require('express');
const ActionCenter = require('../models/ActionCenter');
const Request =require('../models/Request');
const Lesson =require('../models/Lesson');
const Offer = require('../models/Offer');
const router = express.Router();

router.post('/create', async (req, res)=>{
  const {userId}=req.body;
  try {
    const myAC=new ActionCenter({userId});
    await myAC.save();
    res.send(myAC);
  } catch (err) {
    return res.send(err.message);
  }
});

router.get('/', async (req, res)=>{
  const {userId}=req.body;
  try {
    const myAC= await ActionCenter.findOne({userId});
    res.send(myAC);
  } catch (err) {
    return res.send(err.message);
  }
});

router.post('/getReq', async (req, res)=>{
  const {userId} =req.body;
  try {
    const ac= await ActionCenter.findOne({userId})
        .populate({path: 'requests', model: 'Request',
          populate: [{path: 'course', model: 'Course'},
            {path: 'subjects', model: 'Subject'},
            {path: 'offers', model: 'Offer'}]});
    if (ac) {
      return res.send({ac});
    } else {
      return res.send('No Action Center was found');
    }
  } catch (err) {
    return res.send(err.message);
  }
});


router.put('/addReq', async (req, res)=>{
  const {params}=req.body;
  const {userId, course, subjects, additionalInfo,
    timeSlots, lessonLength} = params;
  try {
    // const student =User.findOne({_id:userId});
    const req= new Request({course, subjects, additionalInfo,
      timeSlots, lessonLength});
    const ac= await ActionCenter.findOne({userId});
    if (ac) {
      ac.requests=[...ac.requests, req];
      await req.save();
      await ac.save();
      return res.send({ac});
    }
  } catch (err) {
    res.send(err.message);
  }
});

router.put('/addLesson', async (req, res)=>{
  const {userId, tutorId, Date, offer}=req.body;
  try {
    const lesson=new Lesson({tutorId, Date, offer});
    const ac= await ActionCenter.findOne({userId});
    if (ac) {
      ac.Lessons.push(lesson);
      ac.save((err)=>{
        if (err) {
          res.send('Something went wrong');
        }
        res.send(ac);
      });
    }
  } catch (err) {
    return res.send(err.message);
  }
});


router.put('/addOffer', async (req, res)=>{
  const {tutorId, price, Date, studentId, reqId}=req.body;
  try {
    const offer=new Offer({tutorId, price, Date, studentId});
    const ac= await ActionCenter.findOne({studentId});
    if (ac) {
      const Req= ac.requests.find((Req)=>Req._id===reqId);
      Req.offers.push(offer);
      ac.save((err)=>{
        if (err) {
          res.send('Something went wrong');
        }
        res.send(ac);
      });
    }
  } catch (err) {
    return res.send(err.message);
  }
});


router.put('/addToMyOffers', async (req, res)=>{
  const {tutorId, price, Date, studentId}=req.body;
  try {
    const offer=new Offer({tutorId, price, Date, studentId});
    const ac= await ActionCenter.findOne({studentId});
    if (ac) {
      ac.myOffers.push(offer);
      ac.save((err)=>{
        if (err) {
          res.send('Something went wrong');
        }
        res.send(ac);
      });
    }
  } catch (err) {
    return res.send(err.message);
  }
});


router.put('/addLesson', async (req, res)=>{
  const {offer}=req.body;
  const userId=offer.studentId;
  try {
    const ac= await ActionCenter.findOne({userId});
    const lesson =new Lesson({tutorId, offer});
    if (ac) {
      ac.Lessons.push(lesson);
      ac.save((err)=>{
        if (err) {
          res.send('Something went wrong');
        }
        res.send(ac);
      });
    }
  } catch (err) {
    return res.send(err.message);
  }
});


router.put('/addToMyLessons', async (req, res)=>{
  const {offer}=req.body;
  try {
    const ac= await ActionCenter.findOne({userId: offer.tutorId});
    const lesson =new Lesson({tutorId, offer});
    if (ac) {
      ac.totursLessons.push(lesson);
      ac.save((err)=>{
        if (err) {
          res.send('Something went wrong');
        }
        res.send(ac);
      });
    }
  } catch (err) {
    return res.send(err.message);
  }
});


module.exports = router;
