const express = require("express");
const { body, validationResult } = require('express-validator');
const userModel = require("../models/user.models.js")

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const upload = require("../middlwares/multer.js")

const router = express.Router();

router.get("/test",(req,res) => {
    res.send("user test route")
})

router.get('/register',(req,res) => {
    res.render("register")
})

router.post("/register",
    
    body('username').trim().isLength({min:3}),
    body('email').trim().isEmail().isLength({min:13}), // checking for the email
    body('password').trim().isLength({min:5}),
    
    async (req,res) => {

    const errors = validationResult(req); // whatever the error it comes  in the process it getting stored in the validationresult
    
    if(!errors.isEmpty()) {
        // res.send("invalid data")
        res.status(400).json({
            errors:errors.array(),
            msg:"invalid data"
        })
    }
    
    const {username,email,password} = req.body

    const hashPassword = await bcrypt.hash(password,10)

     

    const newUser = await userModel.create({
        email,
        username,
        password:hashPassword,
        
    })

    res.json(newUser);
})


router.get('/login',(req,res) => {
    res.render('login')
})


router.post('/login',
    // validation
    body('username').trim().isLength({min:3}),
    body('password').trim().isLength({min:5}),
    async (req,res) => {
         
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                error:errors.array(),
                msg:"invalid data "
            })
        }

        const  {username , password} = req.body;

        const user = await userModel.findOne({
            username:username
        })

        if(!user) {
            return res.status(400).json({
                msg:"username or password is incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.status(400).json({
                msg:"username or password is incorrect"
            })
        }

        const token = jwt.sign({
            userId:user._id,
            email:user.email,
            username:user.username
        },process.env.JWT_SECRET
    )

    res.cookie('token',token)
    res.send("loggen in")


    }

    
)



module.exports = router ;
