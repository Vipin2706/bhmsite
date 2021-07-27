require('dotenv').config()
const express = require("express")
const app = express();
const bodyparser = require("body-parser")
const mongoose = require("mongoose")


app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine' , 'ejs')
mongoose.connect("mongodb+srv://admin_vipin:"+process.env.ADMIN_PASS+"@cluster0.nvnya.mongodb.net/bhmDB",{useNewUrlParser:true , useUnifiedTopology:true})


const studentSchema = new mongoose.Schema({
    name:String,
    email:String,
    query:String,
})

const Student = mongoose.model("Student", studentSchema)


app.get("/",(req,res)=>{
    res.render("home")
});


app.post("/home",(req,res)=>{
    const newstudent = new Student({
        name:req.body.fname,
        email:req.body.gmail,
        query:req.body.queries,
    });
    newstudent.save((err)=>{
        if(!err){
            res.render("home")
        }else{
            console.log(err);
        }
    });
})





app.listen(process.env.port || 3000, ()=>{
    console.log("server started at port:3000")
})