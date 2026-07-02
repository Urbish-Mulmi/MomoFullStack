import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },

  description:{
    type:String,
    required: true,
  },
  price:{  
    type:Number,
    required:true,
  },
  photo:{
    type:String,
    required:true,
  },
  

}, {timestamps:true});

const foodModel = mongoose.model("Food", foodSchema);
export default foodModel;