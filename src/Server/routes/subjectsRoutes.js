const express = require('express');
const Subject = require('../models/Subject');
const Course =require('../models/Course');
const mongoose = require('mongoose')

const router = express.Router();

router.get('/',(req,res)=>{
    res.send('it works')
})

// router.put(`/:id`,(req,res)=>{
//     var id =req.params.id;
//         Subject.findOne({id:id},(err,foundObject)=>{
//         if(err){
//             res.send('Wasnt able to update');
//         }
//         else{
//             if(!foundObject){
//                 res.send('coulnt find subject');
//             }
//             else{
//                 if(req.body.courseId)
//                     foundObject.courseId=req.body.courseId;
//                 if(req.body.subs)
//                     foundObject.subs=req.body.subs;

//                 foundObject.save((err,updatedObject)=>{
//                     if(err)
//                        res.send('didnt update')
//                     else
//                        res.send(updatedObject)
//                 })
//             }
               
//         }
//     })
//     res.send('Updated!')
// })

router.post(`/many`, async (req,res)=>{
    const {subjects}=req.body;
    try{
    subjects.map( async element=>{
        const {Heb,Eng,courseName}=element;
        const subject =new Subject({hebName:Heb,engName:Eng,courseName:courseName});
        await subject.save();})
        res.send(subjects);
    }
    catch(err){
        res.send(err.message);
    }
});


//subscribe to course
router.put('/subscribe',async (req,res)=>{
    const {subjects,userId}=req.body;
     //subscribe to every course in the list
    try{
    subjects.map(async element=>{
       await Subject.updateOne({_id:element},{$addToSet:{subs: userId}})
    })
     await User.updateOne({_id:tutorId},{$addToSet:{subjectsIHelp:subjects}});
     res.send(await User.findById(userId))
    }catch(err){
       return res.send(err.message)
    }
})


module.exports = router;
