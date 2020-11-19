const express = require('express');
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Course =require('../models/Course');

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
        var {_id,params} =req.body;
        const {about,img,coursesITeach,coursesITake,subjectsIHelp}=params
        var course;
        var coursesList=[];
        try{
       let user= await User.findOne({_id})
       if(user){
           if(about)
               user.about=about;
           if(img)
               user.img=img;
           if(coursesITeach){
                    let {myCourses} = coursesITeach
                    myCourses.map( async course=>{
                    coursesList=coursesList.concat([course.hebName])
                    course = await Course.findOne({hebName:course.hebName})
                    course.subs=[...course.subs,_id]
                    course.save()
                    })
                    //check why the user doesn't update
                    user.coursesITeach =myCourses;
                    user.save();
                    return res.send(user)
                }
           else if(coursesITake){
                let {myCourses} = coursesITeach
                myCourses.map(course=>coursesList.concat([course.hebName]))
                user.coursesITake=coursesList; 
                ////check why the user doesn't update
                  await user.save()
                  }
           else if(subjectsIHelp){
                subjectsIHelp.forEach(async (value,key,map)=>{
                    subjectsList=[];
                    value.map(subject=>subjectsList.concat([subject.engName])) 
                    course = await Course.findOne({hebName:key}).populate({path:'subjects',model:'Subject'});
                    course.subject.map(subject=>subjectsList.includes(subject.engName)?subject.subs=[...subject.subs,_id]:null)
                    course.save();
                })
            }
         user.save();
         return res.send(user) 
        }
       else
          return res.status(100).send({err:'user was not found'})

    }catch(err){
        return res.status(152).send(err.message)
        }
    })

module.exports = router;