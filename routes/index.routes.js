const express = require('express')
const upload = require('../middlwares/multer.js')
const router = express.Router();
const authMiddleware = require('../middlwares/auth.js')
const fs = require("fs")


const fileModel = require("../models/files.models.js");
const { pathToFileURL } = require('url');

router.get('/home',authMiddleware , async (req,res) => {

    const userFiles = await fileModel.find({
        user:req.user.userId
    })

    console.log(userFiles)

    res.render('home',{
        files:userFiles
    }

    )
})


router.post('/upload-file',authMiddleware , upload.single('file'),
    async(req,res) => {
        // console.log(req.file.filename)
        // res.send(req.file)  // by this line we get info about the file after uploading it 
        // res.send("file uploaded successfully")

        const newFile = await fileModel.create({
            path:req.file.path,
            originalname:req.file.originalname,
            user:req.user.userId
        })

        const fileUrl = `http://localhost:3000/public/upload/${req.file.filename}`
        // res.json(newFile)

    }
)


// router.get('/open-file' , async (req,res) => {
//     const filePath = req.params.path ;

//     if(!filePath) {
//         res.status(400).json({
//             msg:"file path error"
//         })

//         const filepath = await fileModel.findOne({
//             path : filePath 
//         })

//     }
// })




module.exports = router