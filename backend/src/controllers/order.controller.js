import orderModel from "../models/order.model.js";
export const createOrder = async (req, res)=>{

   console.log("REQUEST BODY:", req.body);

   const userId = req.user._id;
   const foods = req.body.foods;

   const order = await orderModel.create({
      userId,
      foods,
   })

   res.status(201).json({
      message:"order created",
      order,
   })
};
  export const success = async(req,res)=>{
    const encoded = req.query.data;
    console.log(encoded);
    const decoded = (JSON.parse(atob(encoded)));
    console.log(decoded);

    const{transaction_uuid} = decoded;

    await orderModel.findByIdAndUpdate(
      transaction_uuid,
      { // update payment status in database
        paymentStatus: decoded.status,
      },
      {new:true},
    );
    res.redirect(`http://localhost:5173/success?id=${transaction_uuid}`)
  }

  export const getOrderById = async(req,res)=>{
    const id = req.params.id;

    const order = await orderModel.findById(id)
    .populate("userId", "email fullName")
    .populate("foods.foodId");
    res.status(200).json({
      message: "order fetched",
      success: true,
      order,
    }

    );
  }