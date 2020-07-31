const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const requireLogin = require('../middleware/requireLogin');

router.get('/allpost', (req, res)=>{
  Post.find()
  .populate('postedBy', '_id name')
  .then((posts) => {
    res.json({posts})
  }).catch((err) => {
    console.log(err)
  });
})

router.post('/createpost',requireLogin, (req,res)=>{
  const {title,body,pic} = req.body;
  if(!title || !body || !pic){
    return  res.status(422).json({error:"Plase add all the fields"})
  }
   req.user.password = undefined
  const post = new Post({
      title,
      body,
      photo:pic,
      postedBy:req.user
  })
  post.save().then(result=>{
      res.json({post:result})
  })
  .catch(err=>{
      console.log(err)
  })
})


router.get('/mypost',requireLogin, (req, res)=>{
  Post.find({postedBy:user._id})
  .populate('postedBy', '_id name')
  .then((mypost) => {
    res.json({mypost})
  }).catch((err) => {
    console.log(err)
  });
})

router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
  Post.findOne({_id:req.params.postId})
  .populate("postedBy","_id")
  .exec((err,post)=>{
      if(err || !post){
          return res.status(422).json({error:err})
      }
      if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                console.log(err)
            })
      }
  })
})

module.exports = router;
