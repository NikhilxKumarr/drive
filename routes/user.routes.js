const express=require('express');
const router=express.Router();
const { body,validationResult} = require('express-validator');
const UserModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

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

router.post('/login',
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),

   async  (req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array(),message:"Invalid data"});
    }
   

    const {username,password}=req.body;

    const user= await UserModel.findOne({username:username});

    if(!user){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const isMatch= await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }


    const token=jwt.sign({
        userID:user._id,
        email:user.email,
        username:user.username
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'1h'
    }
    );

    // res.cookie('token',token,{
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV==='production',
    //     sameSite:'strict',
    //     maxAge:3600000
    // })
    res.cookie('token', token)



    res.json({message:"Login successful"}); 

})





module.exports=router;