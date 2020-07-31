const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key') 
const mongoose = require('mongoose');
const User = mongoose.model('User')      
        
module.exports = (req, res, next)=>{

    const {authorization} = req.headers
    //authorization === Bearer tokenewewewewewewewewewewew
    if(!authorization){
      return res.status(401).json({error:'you must be looged in first!'})
    }
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token,JWT_SECRET, (err, payload)=>{
            if(err){
            return res.status(401).json({error:'you must be loogooo2nd'})
            }else{
              const {_id} = payload
              User.findById(_id)
              .then((userData)=>{
                req.user = userData
                
              })
              next()
            }
            
    })

  
}
