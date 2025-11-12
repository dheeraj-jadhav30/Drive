const express = require('express');

const userRouter = require("./routes/user.routes.js")
const dotenv = require("dotenv") 
const connectToDB = require("./config/db.js")
const cookieParser = require("cookie-parser")
dotenv.config();
const indexRouter = require('./routes/index.routes.js')
const app = express();

connectToDB();

app.set("view engine",'ejs')
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/',indexRouter)
app.use("/user",userRouter)

app.get('/' , (req,res) => {
    res.render("index")
})

app.listen(3000,(req,res) => {
    console.log("server connected successfully")
})