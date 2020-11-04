const express = require('express');
const mongoose = require('mongoose')
const inst = require('../models/Instituten')


const router = express.Router();

router.get('/', async (req,res)=>{
    try{
        const Institutens=  await inst.find()
        if(Institutens){
           return res.send({Institutens})
        }
    }catch(err){
        res.send(err.message)
    }
    })


module.exports = router;