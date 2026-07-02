import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async ()=>{
  try {
    //for local mongo db connection:
  // await mongoose.connect("mongodb://localhost:27017/momofullstack");
  // console.log("Database Connected Succesfully")     

  // for atlas mongo db connection:
   await mongoose.connect(process.env.MONGO_URI);
   console.log("Atlas Database Connected Successfully");

  } catch (error) {
    console.log("Failed to connect to database", error)
    
  }
};

export default connectDB;