// index.js:
import app from "./app.js";
import connectDB from "./db/index.js";

// configure env file in index,js(main file)
import dotenv from "dotenv";
dotenv.config();


// connect db is a promise, so db mah connection paxi matra server chaluna vaya we can use then catch conidition in connect db promise.

connectDB()
  .then(()=>{    
  //app.listen(9999, ()=>{
  app.listen(9000, ()=>{
  console.log("server launched for backend project in port 9000");
})

  })
  .catch((err)=>{
    console.log("failed to connect to db", err);
  })

