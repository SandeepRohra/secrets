
//jshint esversion:6
require('dotenv').config()//env ko use karne k liye y hota h y
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
const saltRounds= 10;

||||||| af7c470
const mongooseEncryption = require('mongoose-encryption');
// mongoose encryption is used to encrypt our data by creating a secret key which is used for  encryption
=======
const md5 = require('md5');// md 5 is used for hashing password and is verry simpe
//where we want to hash a feild we use md5(and here what we want to hash)

>>>>>>> 3139db669f88d1a65eb740ed9f97cf2d7724b085
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
<<<<<<< HEAD
const password= req.body.password

||||||| af7c470
const password =req.body.password

=======
const password= md5(req.body.password)
//Yaha p dono jaga hash use hua h kyuki y jaruri h every same password has same hashes
// to matlab register and login dono routes m use hiua h md5()
>>>>>>> 3139db669f88d1a65eb740ed9f97cf2d7724b085
  User.findOne({email:email},function(err,foundUser){
    if(err){
      console.log(err);
    }
  else{
    if (foundUser){
      bcrypt.compare(password, foundUser.password, function(err, result) {
    // result == true

    if(result ===true){
      console.log(foundUser);
        res.render(`secrets`)
    }  else{
          console.log(email,password);
        res.send(`Invalid email or password`)

      }
});

      }

  }
  })
});







app.route(`/register`)
.get(function(req,res){
  res.render(`register`)
})
.post(function(req,res){
<<<<<<< HEAD
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      const newUser=new User({
        email:req.body.username,
        password:hash
      });
      newUser.save(function(err){
      if(err){
        console.log(err);
      }else{
        res.render(`secrets`)
      }
      })
    });
||||||| af7c470
  const newUser=new User({
    email:req.body.username,
    password:req.body.password
=======
  const newUser=new User({
    email:req.body.username,
    password:md5(req.body.password)
>>>>>>> 3139db669f88d1a65eb740ed9f97cf2d7724b085
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
