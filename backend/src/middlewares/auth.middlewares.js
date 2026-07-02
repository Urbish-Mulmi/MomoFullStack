import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {

    // token to be tested is obtained from cookies, cookie parser used here.
    const token = req.cookies?.token;

    if (!token) {
      return res.status(400).json({
        message: "token not provided",
        success: false,
      });
    }

    // actual token verification done by comparing the token with the secret key
    const encoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // token verification is successful, now we will check if the user exists in the database or not
    const user = await userModel.findById(encoded.id);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    // augment requested object with user information, request header mah clearance pass add gareko.
    req.user = user;
    next();
    
  } catch (error) {
    return res.status(400).json({
      message: "invalid token",
      success: false,
      error: error.message,
    });
  }
};

export const isAdmin = (req, res, next) =>{
  const user = req.user;

  if(user.role !== "admin"){
    return res.status(403).json({
      message:"Privilege reserved for Admin Only, msg from auth.middleware.js for isAdmin check ",
      success:false,
    });
  }
  next();
}