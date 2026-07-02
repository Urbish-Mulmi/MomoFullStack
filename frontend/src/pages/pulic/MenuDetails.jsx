import React from 'react';
import { useLocation, useNavigate } from 'react-router';

const MenuDetails = () => {
  // useLocation provides access to the current URL path (pathname), raw query string (search), hash fragment (hash), and custom navigation data (state).
  const location = useLocation();
  const navigate = useNavigate();
  const food = location?.state;

  console.log('Selected food details from MenuDetails.jsx:', food);

  const handleAddToCart = () => {
    // Add your application's cart handling logic here
    console.log(`Added ${food?.name} to cart`);
  };

  if (!food) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 mb-4 font-sans text-xl font-bold">!</div>
        <h2 className="text-xl font-bold text-gray-800 tracking-tight mb-4">Dish details unavailable</h2>
        <button 
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors border-b border-orange-500/30 pb-1"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Container wrapper to position the absolute back button */}
      <div className="max-w-4xl w-full relative">
        
        {/* Card Top-Left Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md hover:bg-white text-gray-700 hover:text-orange-500 text-xs uppercase tracking-wider font-semibold rounded-xl border border-gray-100 shadow-md transition-all duration-200 group"
        >
          <span className="text-sm transition-transform group-hover:-translate-x-0.5">←</span> 
          Back to Menu
        </button>

        {/* Main Card */}
        <div className="w-full bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Side: Image Showcase */}
          <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[350px] bg-gray-200">
            <img 
              src={food.photo} 
              alt={food.name}
              className="w-full h-full object-cover object-center"
            />
            {/* Soft white gradient mask blending into the white card content */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-transparent to-transparent opacity-60 lg:opacity-40" />
          </div>

          {/* Right Side: Details */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between pt-16 lg:pt-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-orange-500 font-bold block mb-2">
                Special Dish
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                {food.name}
              </h2>

              <p className="text-2xl font-extrabold text-orange-600 mb-6">
                ${food.price}
              </p>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 border-l-2 border-orange-500 pl-4">
                {food.description || "Freshly prepared, delicious meals delivered straight to your craving zone."}
              </p>
            </div>

            {/* Bottom Section: Add to Cart Action */}
            <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-400 tracking-wide uppercase font-medium">
                Fast Delivery Available
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md shadow-orange-100 active:scale-[0.98]"
              >
                Add to Cart
              </button>
            </div>

          </div>

         </div>
       </div>
     </div>
  );
};

export default MenuDetails;



