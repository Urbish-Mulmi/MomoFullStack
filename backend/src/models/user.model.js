import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName:{
    type:String,
    required:true,
  },

  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
  },
  password:{
    type:String,
    required:true,
  },

  photo:{
    type:String

  },

  role:{
    type:String,
    enum:["admin", "user"],
    // enum means one of two options pre defined
    
    default:"user",
  }


}, {timestamps:true});

const userModel = mongoose.model("User", userSchema);
export default userModel;
