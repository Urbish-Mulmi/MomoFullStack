import uploadOnCloudinary from "../utils/cloudinary.js";
import foodModel from "../models/food.models.js"
export const createFood = async (req, res)=>{
  // to view file, photo passed as request data in api we use multer middleware
  // console.log('create food controller active')
  // console.log(req.body);
  // console.log(req.file);

  
  try {
    const {name, description, price} = req.body;
    let url = null;
    if(req.file){
      const res = await uploadOnCloudinary(req.file.path);
      url = res.secure_url;
      console.log(res);    
    }
  
   const food = await foodModel.create({
    name,
    description,
    price,
    photo:url,
   })
  
   res.status(201).json({
    message:"food created",
    success:true,
    food,
    })
  } catch (error) {
    res.status(500).json({
      message:"internal server error",
      success:false,
      error:error.message,
    })    
  }
};

export const getFoods = async (req,res)=>{
  try {
    const foods = await foodModel.find();

   res.status(200).json({
      message: foods.length === 0 ? "no foods yet" : "foods fetched",
      success:true,
      foods,
    })
  
    
  } catch (error) {
     res.status(500).json({
      message:"internal server error",
      success:false,
      error:error.message,
    })
  }
}

export const deleteFoods = async (req,res)=>{
  try {
    // dynamic id is passed when deleteFoods is accessed via url

    const id = req.params.id; 
    await foodModel.findByIdAndDelete(id);
    
   res.status(200).json({
      message:"foods deleted",
      success:true,
      
    })
  
    
  } catch (error) {
     res.status(500).json({
      message:"internal server error",
      success:false,
      error:error.message,
    })
  }
}

export const editFoods = async (req, res) => {
  try {
    const id = req.params.id; 
    const food = await foodModel.findById(id);
    
    if (!food) {
      return res.status(404).json({ message: "Food item not found", success: false });
    }

    // Pull category along with name, description, and price
    const { name, description, price, category } = req.body;

    let url = food.photo || null;

    if (req.file) {
      // FIX 1: You MUST await the promise-based upload wrapper!
      const response = await uploadOnCloudinary(req.file.path);
      
      // Double check that Cloudinary successfully gave you a secure_url back
      if (response && response.secure_url) {
        url = response.secure_url;
      } else {
        console.error("Cloudinary did not return a secure URL:", response);
      }
    }
    
    // FIX 2: Pass category along to the update body payload
    const updatedFood = await foodModel.findByIdAndUpdate(
      id, 
      { name, description, price, category, photo: url },
      { new: true }
    );
    
    res.status(200).json({
      message: "Foods edited successfully",
      success: true,
      data: updatedFood // Good practice to return the updated record to the client
    });
  
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};