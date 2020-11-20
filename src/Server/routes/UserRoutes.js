const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Course =require('../models/Course');
const Subject = require('../models/Subject');
const Institute =require('../models/Institute');

const router = express.Router();

router.post('/:_id',async (req,res)=>{
    const {_id} =req.body;
    if(!_id){
           res.status(433).send({error:`id was not recieved`})
           }
      const user = await User.findOne({_id});
      if (!user) {
        return res.status(422).send(`${id} wasn't found ` );
      }
      res.send({user});
  })

  router.put('/', async (req,res) => {
     const {_id,params} =req.body;
     const {about,img,coursesITeach,coursesITake,subjectsIHelp}=params
     let coursesList =[]
     try{
            let user= await User.findOne({_id})
            if(user){
                if(about)
                    user.about=about;
                if(img)
                    user.img=img;
                if(coursesITeach){
                        let {myCourses} = coursesITeach
                        for(const course of myCourses){
                            courseFound = await Course.findOne({hebName:course.hebName})
                            if(courseFound){
                                courseFound.subs=[...courseFound.subs,_id]
                                coursesList=[...coursesList,courseFound];
                                courseFound.save();
                                }}               
                        user.coursesITeach=coursesList;
                }
           else if(coursesITake){
                let {myCourses,myInstitute} = coursesITake
                coursesList=[];
                const inst =Institute.find({hebName:myInstitute.hebName});
                user.institute=[...user.institute,inst];
                for(const course of myCourses){
                    courseFound = await Course.findOne({hebName:course.hebName})
                    if(courseFound){
                        coursesList=[...coursesList,courseFound];
                        }}               
                user.coursesITake=coursesList;

            if(subjectsIHelp){
                for(const subjectsArr of subjectsIHelp.values())
                {
                    for(const subject of subjectsArr)
                    {
                        const subjects= await Subject.find({engName:subject.engName})
                        for(const subject of subjects)
                        {
                            subject.subs=[...subject.subs,_id];
                            subject.save();
                        }
                    }
                    user.subjectsIHelp=[...user.subjectsIHelp,subjectsArr];
                }
                }
            }}
            user.save();
            return res.send(user) 
        }catch(err){return res.send(err.message)}})

module.exports = router;