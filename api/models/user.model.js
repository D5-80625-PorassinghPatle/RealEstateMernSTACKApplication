import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,

    },
    password:{
        type:String,
        required: true,
    },
    avatar: {
        type:String,
        default:"https://www.pexels.com/photo/creative-graffiti-wall-with-portrait-of-frida-kahlo-6424244/"

    }
},{timestamps:true});

const User =mongoose.model("User",userSchema);

export default User;