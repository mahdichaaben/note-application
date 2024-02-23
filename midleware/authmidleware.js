const jwt=require('jsonwebtoken');
const User = require("../models/User");
const requireAuth=(req,res,next)=>{
     const token =req.cookies.jwt;
    //  check json web token exist and verified
    if(token){
        jwt.verify(token,'mahdich',async (err,decodedToken)=>{
            if (err){
                console.log(err.message)
                res.redirect('/signin')
            }else{
                console.log(decodedToken);
                let user=await User.findById(decodedToken.id);
                 res.locals.user=user;
                next()
            }
        })

    }else{
        res.redirect('/signin');

    }

}
// check curent user
const checkuser=(req,res,next)=>{
    const token=req.cookies.jwt;
    if (token){
        jwt.verify(token,'mahdich',async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null;
                next()
            }else{
                console.log(decodedToken);let user=await User.findById(decodedToken.id)
                 
                res.locals.user=user; //passsing this variable into views
                next();
            }
        })

    }else{
        res.locals.user=null;
        next();

    }

}
module.exports={requireAuth,checkuser};