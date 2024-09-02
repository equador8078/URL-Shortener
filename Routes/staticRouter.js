const express = require('express')
const URL=require('../Model/url');
const { restrictTo } = require('../Middleware/middleware');
const staticRouter=express.Router();

staticRouter.get('/users/admin',restrictTo(["ADMIN"]),async(req,res)=>{
    if(!req.user) return res.render('login')
    const allURL=await URL.find({});
    return res.render('home',
        {
            urls:allURL,
        }
    )
})

staticRouter.get('/',restrictTo(["NORMAL","ADMIN"]),async(req,res)=>{
    if(!req.user) return res.render('login')
    const allURL=await URL.find({createdBy:req.user._id});
    return res.render('home',
        {
            urls:allURL,
        }
    )
})

staticRouter.get('/signup',(req,res)=>{
    return res.render("signup")
})
staticRouter.get('/login',(req,res)=>{
    return res.render("login")
})

module.exports=staticRouter;