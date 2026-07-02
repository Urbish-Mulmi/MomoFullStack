// // import { useQuery } from '@tanstack/react-query'
// import { useQuery } from '@tanstack/react-query'
// import React from 'react'
// import { getFoods } from '../api/food.service.js'
// const Menu = () => {

//   // tanstack has useQuery, useMutation
//   //  to fetch/get datas using tanstack
//   // useQuery vitra object dina parxa(
//   // {querykokeyname dina,function call garna name dina}
//   //)
//   const {data, isPending, isError, error} = useQuery({
//     queryKey:["foods"],
//     queryFn:getFoods, //map the getFoods function to fetch food gng
//   })

//   if(isPending){
//     return <div>Msg from tanstack, menu,jsx Loading....</div>
//   }
//   if(isError){
//     return <div>Msg from tanstack, menu,jsx Error....</div>
//   }
//   console.log(data)


//    return (
//   <div>
//     {data?.foods?.map((food) => (
//       <div key={food._id}>
//         <img src={food.photo} alt={food.name} />
//         <h2>{food.name}</h2>
//         <h2>{food.description}</h2>
//         <h2>{food.price}</h2>
//       </div>
//     ))}
//   </div>
// )
    
  
// }

// export default Menu

// styling done by ai:
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getFoods } from '../../api/food.service'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { add } from '../../redux/features/cartSlice'


// tanstack is being used to manage/update states in frontend
// tanstack query
const Menu = () => {
  
  const dispatch = useDispatch();
  const cart = useSelector((state)=>state.cart.cartItems);
  console.log(cart);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  })

  const navigate = useNavigate();
  
  // Smooth Animated Loading State
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-600 font-medium animate-pulse">Loading delicious food menu...</p>
      </div>   
    )
  }

  // Clean Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl max-w-md text-center shadow-sm">
          <p className="font-bold text-lg mb-1">Oops! Something went wrong</p>
          <p className="text-sm text-red-600">{error?.message || "Failed to fetch the menu. Please try again later."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Our Special <span className="text-orange-500">Menu</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Freshly prepared, delicious meals delivered straight to your craving zone.
        </p>
      </div>

      {/* Food Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* map uses food as a parameter, food is that predefined/returned object from the array. */}
        {data?.foods?.map((food) => (
          <div 
            key={food._id} 
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
          >
            {/* Food Image Container */}
            <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
              <img
              onClick={()=>{navigate(`/menu/${food._id}`, {state:food})}} 
                src={food.photo} 
                alt={food.name} 
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
              />
                    
            </div>

            {/* Food Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {food.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {food.description || "No description available for this item."}
                </p>
              </div>

              {/* Price and Action button */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xl font-extrabold text-orange-600">
                  ${food.price}
                </span>
                <button 
                onClick={()=>{
                  dispatch(add(food));
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-orange-200">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu