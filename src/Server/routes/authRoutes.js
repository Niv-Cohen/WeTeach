const express = require('express');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router();

router.post('/signup', async (req,res) => {
    const {email,password} = req.body;
    try{  
     const user = new User({email,password})
     await  user.save();
     const token = jwt.sign({userId:user._id},"My_Secret_Key")
    res.send({token,user})
    }catch(err){
        res.status(422).send(err.body)
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(422).send({ error: 'Must provide email and password' });
    }
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).send({ error: 'Invalid password or email' });
    }
  
    try {
      await user.comparePassword(password);
      const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
      res.send({ token,user});
    } catch (err) {
      return res.status(422).send({ error: 'Invalid password or email' });
    }
  });

  router.post('/users/:_id',async (req,res)=>{
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

module.exports = router;