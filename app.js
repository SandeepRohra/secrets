//jshint esversion:6
require('dotenv').config()//env ko use karne k liye y hota h y
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session')//y teen chiz require karni padhti h
const passport = require('passport');//passport k sath passport local b add karna padhta h npm i m
const passportLocalMongoose = require('passport-local-mongoose');//y use karne k liye mongoose m b connect karna padhta hai





const app =express()
app.use(express.static(`public`));
app.set(`view engine`,`ejs`);
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({//fir y same to same karn padhta h  npm -express session m apan docs check kar sakte h
  secret:`our little secret`,//yaha apan apna secret code daalte h yaha string h vo
  resave:false,
  saveUninitialized: false,
}));
app.use(passport.initialize());//then y do line likhte h use docs for refrence
app.use(passport.session())//use karne k liye hi y do line likte h




mongoose.connect("mongodb://localhost:27017/userDB")
mongoose.set(`useCreateIndex`,true)//yai b likhte h reffer docs its used to remove deprication warnning
const userSchema =new mongoose.Schema({
  email:String,
  password:String
});
userSchema.plugin(passportLocalMongoose)//passport is used as plugin after making schema


const User =new mongoose.model(`User`,userSchema)


// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());//then y 3 line likte h a alwys reffer to docs

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







app.route(`/`)
.get(function(req,res){
  res.render(`home`)
});










app.route(`/login`)
.get(function(req,res){
  res.render(`login`)
})
.post(function(req,res){
const user =new User({
  username:req.body.username,
  password:req.body.password
});
req.login(user,function(err){//yaha p error tab hoga jab vo user exist nii karta hoga y to pass galat hoga
  if(err){
    console.log(err);
    res.send(`Invalid password or user`)
  }else{
    passport.authenticate(`local`)(req,res,function(){//passsport.authenticate is a function of passport  to check user and password
      res.redirect(`/secrets`)
    })
  }
})
});







app.route(`/register`)
.get(function(req,res){
  res.render(`register`)
})
.post(function(req,res){// Yaha p register passport ka function h vo use karte h
//object k andar srif username aata h kyuki password ko apan ko authenticate karna padhta h
  User.register({username:req.body.username},req.body.password,function(err,user){
    if(err){
      console.log(err);
      res.redirect(`register`);
    }else{
      passport.authenticate(`local`)(req,res,function(){
        res.redirect(`/secrets`)
      })
    }
  })

});
app.route(`/secrets`)
.get(function(req,res){
  if(req.isAuthenticated()){
    res.render(`secrets`)
  }else{
    res.redirect(`/login`);
  }
})




app.route(`/logout`)
.get(function(req,res){
  res.redirect(`/`)
});







app.route(`/submit`)
.get(function(req,res){
  res.render(`submit`)
});













//5)Then we listen it to a port using
app.listen(3000,function(req,res){
console.log(`Server is running at port 3000`)
})
