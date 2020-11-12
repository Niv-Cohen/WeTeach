const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Course = require('../models/Course');
const Degree = require('../models/Degree');
const router = express.Router();

router.post('/add',async (req,res)=>{
    const {hebName,engName,institute}=req.body;
    try{
        const courses = await Course.find({degree:engName}).select('_id');
        const degree=new Degree({hebName,engName,courses,institute});
        await degree.save();
        res.send(degree);
    }catch(err){
            res.send(err.message)
    }
})




module.exports = router;