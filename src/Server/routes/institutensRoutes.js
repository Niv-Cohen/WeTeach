const express = require('express');
const mongoose = require('mongoose')
const inst = require('../models/Institute')
const Degree = require('../models/Degree');
const { populate } = require('../models/Institute');


const router = express.Router();

router.get('/', async (req,res)=>{
    try{
        const Institutens=  await inst.find().select('hebName degrees')
        .populate({path:'degrees',model:'Degree',select:'hebName courses' ,
        populate:{path:'courses',model:'Course',select:'hebName subjects' ,
        populate:{path:'subjects',model:'Subject',select:'hebName engName' }
        }}) 
        return res.send(Institutens);     
    }catch(err){
        res.send(err.message)
    }
    })


    router.post('/add',async (req,res)=>{
        const {hebName,engName}=req.body;
        try{
            const degrees = await Degree.find({institute:hebName}).select('_id');
            const institute=new inst({hebName,engName,degrees});
            await institute.save();
            res.send(institute);
        }catch(err){
                res.send(err.message)
        }
    })
module.exports = router;