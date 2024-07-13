// Code  for mongoose config in backend
// Filename - backend/index.js
 
// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'yourDB-name',
    
      
}).then(() => { 
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
  const users=require('./function/userfunction')
  const {filesrouter}=require('./function/gridfsfunction')
  const express = require('express');


  const app = express();
  const cors = require("cors");
  console.log("App listen at port 5000");
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cors());
  
  app.use('/files',filesrouter);

  app.use('/users/login',users.loginuser);

  app.use('/users/signup',users.registeruser);

  app.post('/testpresave',(req,res,next)=>{
    console.log(req.body)
    
    res.send([])
  })
  app.post('/testdata',(req,res,next)=>{
    console.log(req.body)
    res.send([])
  })
  app.listen(5001);