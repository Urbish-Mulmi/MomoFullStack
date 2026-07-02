import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { deleteFood, getFoods } from "../api/food.service";
import { add } from "../redux/features/cartSlice";

const FoodManagement = () => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const cart = useSelector((state) => state.cart.cartItems);
  console.log(cart);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });

  const navigate = useNavigate();

  

 const deleteMutation = useMutation({
  mutationFn: (id) => {
    console.log("mutation received:", id);
    return deleteFood(id);
  },

  onSuccess: () => {
    console.log("delete success");
    queryClient.invalidateQueries({ queryKey: ["foods"] });
  },

  onError: (err) => {
    console.log("delete failed:", err);
  },
});

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">
          Loading food database...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto my-8 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
        <p className="font-semibold">Something went wrong!</p>
        <p className="text-sm">{error?.message || "Could not fetch menu."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Header section with add button placeholder typical for management views */}
      <div className="sm:flex sm:items-center sm:justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Food Management
          </h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-700">
            A list of all items in the food menu database including their image,
            description, and price.
          </p>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => {
              navigate("/admin/add-food");
            }}
            className="block rounded-lg bg-orange-600 px-3 py-2 sm:px-4 sm:py-2.5 text-center text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors"
          >
            Add New Item
          </button>
        </div>
      </div>

      {/* MOBILE: Stacked Cards - below sm */}
      <div className="sm:hidden flex flex-col gap-3">
        {data?.foods?.map((food) => (
          <div
            key={food._id || food.name}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex gap-3"
          >
            <img
              onClick={() => navigate(`/menu/${food._id}`, { state: food })}
              src={food.photo}
              alt={food.name}
              className="h-16 w-16 flex-shrink-0 rounded-md object-cover border border-gray-100 cursor-pointer"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm truncate">{food.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-orange-600 text-sm">RS {food.price}</span>
                <div className="flex gap-3 text-xs font-medium">
                  <button
                    className="text-indigo-600"
                    onClick={() => navigate('/admin/edit-food', { state: food })}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => deleteMutation.mutate(food._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: Table - sm and up. Image/Name/Price/Actions are fixed-width and always visible; Description takes remaining space and truncates instead of pushing other columns out. */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full table-fixed divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th scope="col" className="px-4 py-4 w-20">
                Image
              </th>
              <th scope="col" className="px-4 py-4 w-32 lg:w-40">
                Item Name
              </th>
              <th scope="col" className="px-4 py-4">
                Description
              </th>
              <th scope="col" className="px-4 py-4 w-24">
                Price
              </th>
              <th scope="col" className="px-4 py-4 text-right w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.foods?.map((food) => (
              <tr
                key={food._id || food.name}
                className="hover:bg-gray-50/70 transition-colors"
              >
                <td className="px-4 py-4">
                  <img
                    onClick={() =>
                      navigate(`/menu/${food._id}`, { state: food })
                    }
                    src={food.photo}
                    alt={food.name}
                    className="h-12 w-16 rounded-md object-cover border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </td>

                <td className="px-4 py-4 font-medium text-gray-900 truncate">
                  {food.name}
                </td>

                <td className="px-4 py-4 text-gray-600">
                  <p className="line-clamp-2 text-sm">
                    {food.description}
                  </p>
                </td>

                <td className="px-4 py-4 font-semibold text-orange-600 whitespace-nowrap">
                  RS {food.price}
                </td>

                <td className="px-4 py-4 text-right text-sm font-medium space-x-3 whitespace-nowrap">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 transition-colors"
                    onClick={() => navigate('/admin/edit-food', {state:food})}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 transition-colors"
                    onClick={() => {
                      console.log("button clicked:", food._id);
                      deleteMutation.mutate(food._id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodManagement;