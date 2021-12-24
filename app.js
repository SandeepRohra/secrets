
//jshint esversion:6
require('dotenv').config()//env ko use karne k liye y hota h y
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds= 10;

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
const password= req.body.password

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
