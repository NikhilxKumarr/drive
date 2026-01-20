const express=require('express');
const router=express.Router();
const { body,validationResult} = require('express-validator');
const UserModel=require('../models/user.model');
const bcrypt=require('bcrypt');

router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',
    body('email').trim().isEmail(),
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),

   async  (req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array(),message:"Invalid data"});
    }
   

    const {username,email,password}=req.body;

    const hashPassword= await bcrypt.hash(password,10);

    const newUser= await UserModel.create({
        username,
        email,
        password:hashPassword
    })

    res.json(newUser)
})


router.get('/login',(req,res)=>{
    res.render('login');
})







module.exports=router;