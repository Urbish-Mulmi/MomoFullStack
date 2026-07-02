import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({ 
  userId:{
    type:  mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  foods:[
    {
    foodId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Food'
    },

    quantity:{
      type:Number,
      default: 1,
    },}
  ],

  paymentStatus:{
    type:String,
    enum:["PENDING",
       "COMPLETE",
        "AMBIGOUS",
         "FULL_REFUND", "CANCELLED", 
         "NOT_FOUND", "PARTIAL_REFUND",
        "Service is currently unavailable"],
        default:"PENDING",
  }


}, {timestamps:true});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;