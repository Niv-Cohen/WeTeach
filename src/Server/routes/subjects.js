const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

router.get('/',(req,res)=>{
    res.send('it works')
})

router.put(`/:id`,(req,res)=>{
    var id =req.params.id;
    Subject.findOne({id:id},(err,foundObject)=>{
        if(err){
            res.send('Wasnt able to update');
        }
        else{
            if(!foundObject){
                res.send('coulnt find subject');
            }
            else{
                if(req.body.courseId)
                    foundObject.courseId=req.body.courseId;
                if(req.body.subs)
                    foundObject.subs=req.body.subs;

                foundObject.save((err,updatedObject)=>{
                    if(err)
                       res.send('didnt update')
                    else
                       res.send(updatedObject)
                })
            }
               
        }
    })
    res.send('Updated!')
})

router.post(`/`, async (req,res)=>{
    const subject =new Subject({
        id: req.body.id,
        courseId:req.body.courseId,
        subs:[]
    });
    console.log('created Subject');
    try{
        await subject.save();
        res.send('new subject was created');
    }
    catch(err){
        res.send(`Couln't create a new subject`);
    }
});
module.exports = router;
