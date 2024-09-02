const express=require('express');
const {handelUserSignup,handelUserLogin}=require('../Controller/user')
const userRouter=express.Router();

userRouter.post('/signup',handelUserSignup)
userRouter.post('/login',handelUserLogin)

module.exports=userRouter;