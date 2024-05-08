const express = require('express');
const mongoose = require('mongoose');


const signroutes=require('./routes/authrout');
const blogroutes=require('./routes/blogroutes');
const { urlencoded } = require("body-parser");
const cookieparser=require("cookie-parser");
const {requireAuth,checkuser}=require('./midleware/authmidleware')
const app = express();


// view engine
app.set('view engine', 'ejs');

// middleware_____________________________________________________
app.use(express.static('public'));
app.use(express.json())
// bech nejmo nraj3o json as res.json({obj})
app.use(cookieparser())
// nesn3o bih cookies
app.use(urlencoded({ extended: false }));
// url encoded bech yefhem req.body elii hia object (ya3mel auto-parse )
// ________________________________________________________________

// database connection
const dbURI = 'mongodb+srv://blogproject:name@password.oo3haak.mongodb.net/jwt?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err)); 
// routes
app.get('*',checkuser)
app.get('/', (req, res) => res.render('home'));
app.use( signroutes);
app.use('/blogs',requireAuth, blogroutes);




























// __________________________ chma3neha cookies!!!!!!____________________________________
// app.get('/set-cookies',(req,res)=>{
  
//   res.cookie("newUser",false)
//   res.cookie("is emplay",true,{maxAge:1000*70,httpOnly:true
//   })
//   res.send()
// })
// app.get('/read-cookies',(req,res)=>{
//   // res.setHeader('set-cookie',"new user");
//   const cookies=req.cookies;
//   console.log(cookies.newUser)
//   res.json(cookies)
// })
// _________________________________________________________________________________________
