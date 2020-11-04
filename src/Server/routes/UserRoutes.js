const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { param } = require('./authRoutes');
const User = mongoose.model('User')

const router = express.Router();

router.put('/users/:id', async (req,res) => {
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
               await user.save;
               res.send({user})   
       }
       else
          return res.status(100).send({err:'user was not found'})
    }catch(err){
        return res.status(152).send({err})
    }     
    })




module.exports = router;