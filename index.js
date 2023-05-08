import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserData from "./models/UserData.js";
const app= express();
app.use(express.json())
app.use(cors())
dotenv.config()
const PORT = `${process.env.PORT}` || 6001;
mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

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
