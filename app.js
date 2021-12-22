
//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const mongooseEncryption = require('mongoose-encryption');
const app =express()
app.use(express.static(`public`));
app.set(`view engine`,`ejs`);
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb://localhost:27017/userDB")
const userSchema =new mongoose.Schema({
  email:String,
  password:String
});
// var secret = `Thisismyownsecret`;
userSchema.plugin(mongooseEncryption, { secret: process.env.SECRET ,encryptedFields: ['password']})


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
const password =req.body.password

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
    password:req.body.password
  });
  newUser.save(function(err){
  if(err){
    console.log(err);
  }else{
    res.render(`secrets`)
  }
  })
});







































app.listen(3000,function(){
  console.log(`Server started at port 3000`);
})
