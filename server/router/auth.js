const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req , res) => {
    res.send("Hello Server  world from the server");
});

router.post('/register', async (req , res)=>{

    try{
        const  { name , email , phone , work , password , cpassword } = req.body;
        if( !name || !email || !phone || !work || !password || !cpassword)
            return res.status(422).json({error : "Plz filled the field properly !"});
    
        const userExist = await User.findOne({email : email});

        if(userExist)
            return res.status(422).json({error : " Email already exist"});
        
        if(password != cpassword)
            return res.status(422).json({error : " Password is not matching"});
        
        const user = new User({name , email , phone , work , password , cpassword});
        const userRegister = await user.save();
        
        if(userRegister)
            res.status(201).json({message : "User registrated successfully"});
        else
            res.status(500).json({error : "Failed to register"});
        
    }
    catch(err){
        console.log(err);
    }
   
});

//about us page
router.get('/about',authenticate , (req , res) => {
    //console.log("Hello world from the server");
    res.send(req.rootUser);
});
//get user data for contact us and home page
router.get('/getdata', authenticate , (req,res) => {
    res.send(req.rootUser);
});

//logout page
router.get('/logout' , (req,res) => {
    res.clearCookie('jwtoken', {path :'/'});
    console.log("Logout");
    res.status(200).send("User Logout");
});

//contact us page
router.post("/contact",authenticate , async (req,res) => {
    try{
        const {name,email,phone,message} = req.body;

        if(!name || !email || !phone || !message)
            return res.json({error:"Plz filled the contact form"});
        
            const userContact =await User.findOne({_id:req.userID});
            if(userContact){

                const userMessage = await userContact.addMessage(name,email,phone,message);

                await userContact.save();
                res.status(200).json({message:"User contact successfully"});
            }
    }
    catch(err){
        console.log(err);
    }
});

//login route
router.post('/signin', async (req , res)=>{
    try{
        let token;
        const { email , password } = req.body;
        if(!email || !password)
            return res.status(400).json({error : "Please filled the data"});
        
        const userLogin = await User.findOne({email:email});

        if(!userLogin)
            res.status(400).json({error : "Invalid Credential"});

        
        const isMatch = await bcrypt.compare(password,userLogin.password);
        if(!isMatch)
            res.status(400).json({error : "Invalid Credential"});
       
        token=await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken",token , {
            expires:new Date(Date.now()+25892000000),
            httpOnly:true
        })
        res.status(201).json({message : "User Signin successfully"});


    }
    catch(err){
        console.log(err);
    }
});

/* USing promises
router.post('/register',(req , res)=>{
    const  { name , email , phone , work , password , cpassword } = req.body;
    if( !name || !email || !phone || !work || !password || !cpassword)
        return res.status(422).json({error : "Plz filled the field properly !"});

    User.findOne({email : email})
    .then((userExist) => {
        if(userExist)
            return res.status(422).json({error : " Email already exist"});
        
        const user = new User({name , email , phone , work , password , cpassword})
        user.save().then(() => {
            res.status(201).json({message : "User registrated successfully"});
        }).catch((err) => res.status(500).json({error : "Failed to register"}));
    }).catch(err => { console.log(err);});
    
    //console.log(req.body);
    //res.json({message:req.body});
    res.send("Mera router page");

     
});
*/

 /*
router.get('/about',middleware , (req , res) => {
    res.send("Hello world from the server");
});

router.get('/contact', (req , res) => {
    res.send("Hello world from the server");
});

router.get('/signin', (req , res) => {
    res.send("Hello world from the server");
});

router.get('/signup', (req , res) => {
    res.send("Hello world from the server");
});
*/

module.exports = router;