
//jshint esversion:6
require('dotenv').config()//env ko use karne k liye y hota h y
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5');// md 5 is used for hashing password and is verry simpe
//where we want to hash a feild we use md5(and here what we want to hash)

const app =express()
app.use(express.static(`public`));
app.set(`view engine`,`ejs`);
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb://localhost:27017/userDB")
const userSchema =new mongoose.Schema({
  email:String,
  password:String
});


const User =new mongoose.model(`User`,userSchema)








app.route(`/`)
.get(function(req,res){
  res.render(`home`)
});










app.route(`/login`)
.get(function(req,res){
  res.render(`login`)
})
.post(function(req,res){
const email = req.body.username
const password= md5(req.body.password)
//Yaha p dono jaga hash use hua h kyuki y jaruri h every same password has same hashes
// to matlab register and login dono routes m use hiua h md5()
  User.findOne({email:email},function(err,foundUser){
    if(err){
      console.log(err);
    }
  else{
    if (foundUser && foundUser.password=== password){
      console.log(foundUser);
        res.render(`secrets`)
      }
      else{
          console.log(email,password);
        res.send(`Invalid email or password`)

      }
  }
  })
});







app.route(`/register`)
.get(function(req,res){
  res.render(`register`)
})
.post(function(req,res){
  const newUser=new User({
    email:req.body.username,
    password:md5(req.body.password)
  });
  newUser.save(function(err){
  if(err){
    console.log(err);
  }else{
    res.render(`secrets`)
  }
  })
});



app.route(`/logout`)
.get(function(req,res){
  res.redirect(`/`)
});







app.route(`/submit`)
.get(function(req,res){
  res.render(`submit`)
});







































app.listen(3000,function(){
  console.log(`Server started at port 3000`);
})
