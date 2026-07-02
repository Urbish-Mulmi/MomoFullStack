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
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header section with add button placeholder typical for management views */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Food Management
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all items in the food menu database including their image,
            description, and price.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              navigate("/admin/add-food");
            }}
            className="block rounded-lg bg-orange-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors"
          >
            Add New Item
          </button>
        </div>
      </div>

      {/* Tabular Layout */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Image
                </th>
                <th scope="col" className="px-6 py-4">
                  Item Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Description
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4 text-right">
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
                  {/* Thumbnail Image column */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <img
                      onClick={() =>
                        navigate(`/menu/${food._id}`, { state: food })
                      }
                      src={food.photo}
                      alt={food.name}
                      className="h-12 w-16 rounded-md object-cover border border-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </td>

                  {/* Name Column */}
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {food.name}
                  </td>

                  {/* Description Column */}
                  <td className="px-6 py-4 text-gray-600 max-w-md">
                    <p className="line-clamp-2 text-xs sm:text-sm">
                      {food.description}
                    </p>
                  </td>

                  {/* Price Column */}
                  <td className="whitespace-nowrap px-6 py-4 font-semibold text-orange-600">
                    RS {food.price}
                  </td>

                  {/* Admin Actions Column */}
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-3">
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
    </div>
  );
};

export default FoodManagement;