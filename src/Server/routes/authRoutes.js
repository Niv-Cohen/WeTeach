const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router();

router.post('/signup', async (req,res) => {
    const {email,password} = req.body;
    try{  
     const user = new User({email,password})
     console.log('created new User')
     await  user.save();
     console.log('saved user in data base')
     const token = jwt.sign({userId:user._id},"My_Secret_Key")
    res.send({token})
    }catch(err){
        res.status(422).send(err.body)
    }
})

router.post('/signin',async (req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(422).send({error: 'Must provide email and password'})
    }

    const user = await User.find({ email });
    if(!user)
        return res.status(422).send({error: 'Email not found'})

    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId:user._id},"My_Secret_Key")
        res.send({token})
    } catch(err){
        return res.status(422).send({ error: 'Invalid password'});
    }
})

module.exports = router;