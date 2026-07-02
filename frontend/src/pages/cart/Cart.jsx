import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { increment,decrement, remove } from '../../redux/features/cartSlice';
import { createOrder } from '../../api/order.service';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Calculate total cart value dynamically
  const totalAmount = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);


const handlePayment = async () => {
  const foods = cart.map((food) => ({
    foodId: food._id,
    quantity: food.quantity
  }));

  console.log(foods);

  const res = await createOrder({
    foods,
    totalAmount
  });

  console.log(res);

  navigate("/payment", {
    state:{ totalAmount, orderID:res.order._id},
  });
};
  

  // Fallback / Empty Cart State
  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-5 text-3xl shadow-inner">
          🛒
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 max-w-sm mb-6">
          Looks like you haven't added anything to your cart yet. Go grab something delicious!
        </p>
        <button 
          onClick={() => navigate('/menu')}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md shadow-orange-100 transition-colors"
        >
          Browse Our Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Title Section */}
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
          Shopping <span className="text-orange-500">Cart</span>
        </h1>

        {/* Responsive Grid Split: Items vs Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {cart.map((food) => (
              <div 
                key={food._id} 
                className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-200 hover:shadow-md"
              >
                {/* Item Details Block */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="h-20 w-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                    <img 
                      src={food.photo} 
                      alt={food.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                      {food.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                      {food.description || "No description"}
                    </p>
                    <span className="inline-block mt-2 text-sm font-extrabold text-orange-600">
                      Rs.{food.price}
                    </span>
                  </div>
                </div>

                {/* Counter and Remove Row */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50">
                  
                  {/* Plus / Minus Buttons */}
                  <div className="flex items-center bg-gray-50 border border-gray-200/60 rounded-xl px-1.5 py-1">
                    <button
                     onClick ={()=>{
                      dispatch(decrement(food._id))
                    }} 
                    className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 font-bold rounded-lg transition-colors shadow-sm active:scale-95">
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-gray-800">
                      {food.quantity || 1}
                    </span>
                    <button onClick ={()=>{
                      dispatch(increment(food._id));
                    }} 
                     className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 border border-gray-200 text-gray-600 font-bold rounded-lg transition-colors shadow-sm active:scale-95">
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                  onClick = {()=>{
                    dispatch(remove(food._id));
                  }}
                  className="text-xs uppercase tracking-wider font-bold text-gray-400 hover:text-red-500 transition-colors p-2">
                    Remove
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">
              Order Summary
            </h2>
            
            <div className="flex flex-col gap-3 text-sm text-gray-600 border-b border-gray-100 pb-4 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-semibold text-gray-900">Rs.{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-6">
              <span className="text-base font-bold text-gray-900">Total</span>
              <span className="text-2xl font-extrabold text-orange-600">
                Rs.{totalAmount.toFixed(2)}
              </span>
            </div>

            <button onClick={handlePayment}
              
             className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-100 active:scale-[0.99]">
              Proceed to Checkout
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;