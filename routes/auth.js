const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/key')


router.post('/signup', (req, res)=>{

  const {name, email,password} = req.body;
  
  if(!name ||!email || !password){
     return res.json({error:"All feilds are required"})
  }else {
    User.findOne({email: email})
    .then((savedUser)=>{
      if(savedUser){
        return res.json({error:"User already exist with that email"})
        } 
        else{
        bcrypt.hash(password, 10)
          .then(hashedPassword=>{
            const user = new User({
              email,
              name,
              password:hashedPassword
            })
            user.save()
            .then(user=>{
              res.json({message:`${user.name} Sucessfully Rejistered!`})
            })
            .catch(error=>{
              console.log(error)
            })
          })
      }
    }).catch(error=>{
      console.log(error)
    })
  }
})
router.post('/signin', (req, res)=>{

    const {email, password} = req.body;
    if(!email || !password){
      return res.status(422).json({error:'please provoid email and password first'})
    }else{
      User.findOne({email:email})
      .then((savedUser)=>{
        if(!savedUser){

          return res.status(422).json({error:'Invalid Email or Password'})

        }else{
              bcrypt.compare(password, savedUser.password)
              .then((Match)=>{
                if(Match){
                  
                  const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                  const {_id, name, email} = savedUser;
                  res.json({token, user:{_id, name, email}})



                }else{
                  return res.status(422).json({error:'Invalid Email or Password'})
                }
              }).catch((error)=>{
                  console.log(error)
              })
        }
      }).catch((error)=>{
            console.log(error);
      })
    }
})



module.exports = router;