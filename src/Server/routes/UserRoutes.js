const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { param } = require('./authRoutes');
const Subject = require('../models/Subject');
const User = require('../models/User');
const Course =require('../models/Course');

const router = express.Router();

router.put('/:id', async (req,res) => {
        var {_id,params} =req.body;
        try{
       const user= await User.findOne({_id})
       if(user){
           if(params.about)
               user.about=params.about;
           else if(params.img)
               user.img=params.img;
            else if(params.courses)        
               user.courses=params.courses;
            else if(params.subjects)
               user.subjects=params.subjects;
               user.save;
               res.send({user})   
       }
       else
          return res.status(100).send({err:'user was not found'})
    }catch(err){
        return res.status(152).send({err})
        }
    })


    router.put('/setup/', async(req,res)=>{
       const {setUp,_id}=req.body;
       try{
       const user= await User.findOne({_id});
       if(setUp.student){
          const {coursesITake,subjectsIHelp} =setUp.student;
          if(coursesITake)
             user.coursesITake=[...user.coursesITake,...coursesITake];
          if(subjectsIHelp){
            subjectsIHelp.map(async ref=> {
                user.subjectsIHelp=[...user.subjectsIHelp,subjectsIHelp];
                var subject = await Subject.findone({_id:ref})
                subject.subs=[...subject.subs,user]})
          }
          if(setUp.tutor){
              const {coursesITeach} =setUp.tutor;
              if(coursesITeach){
                user.coursesITeach=[...user.coursesITeach,coursesITeach];
                coursesITeach.map(async ref=>{
                    var course = await Course.findOne({_id:ref})
                    course.subs
                })
              }
          }
       }
       res.send(user);
    }catch(err){
        return res.status(152).send(err.message)
        }
    })

module.exports = router;