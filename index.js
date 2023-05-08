import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserData from "./models/UserData.js";
const app= express();
app.use(express.json())
app.use(cors())
const port = 3001
const mongoURI='mongodb+srv://rounakgupta120:rounak@cluster0.zu4zx9q.mongodb.net/?retryWrites=true&w=majority'

   mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology: true}).then( (result)=>{
    app.listen(3002);
    console.log('connected');

 } )
app.get('/',(req,res)=>{
    res.send('hello world');
})
app.post('/stats',async(req,res)=>{
    let email=req.body.email  
    let user=await UserData.findOne({email})
    if(!user){
        try{
        await UserData.create({
            email:req.body.email,
            timeclue:[req.body.timeclue],
            accuracy:[req.body.accuracy]
        })
        res.json({success:true})
    }catch(error){
        console.log(error)
        res.json({success:false})
    }
    }else{
        
        try{
            await UserData.findOneAndUpdate({email:req.body.email},
                {$push:{timeclue:req.body.timeclue,accuracy:req.body.accuracy}}).then(()=>{
                    res.json({success:true})
                })
        }catch(error) {
            console.log(error)
            res.json({success:false})
        }
    }
})
app.get('/getdetails',async(req,res)=>{
    let details=await UserData.find();
    // console.log(details);
    res.send(details)
})
app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})
