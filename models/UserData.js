import { Double } from "bson"
import mongoose from "mongoose"
const UserSchema=new mongoose.Schema({
        email:{
            type:String,
            require:true
        },  
        timeclue:{
            type:Array
        },
        accuracy:{
            type:Array
        }
    }
    )
const User = mongoose.model("UserData", UserSchema);
export default User; 