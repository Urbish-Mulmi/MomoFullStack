import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useDispatch } from "react-redux";
import { getOrder } from "../../../api/order.service";
import { clearCart } from "../../../redux/features/cartSlice";

const Success = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["order", id],
    queryFn: () => {
      if (!id) return null;
      return getOrder(id);
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.order) {
      dispatch(clearCart());
    }
  }, [data, dispatch]);

  // 1. Loading State
  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
        <p className="mt-4 text-sm font-medium text-gray-500">Loading order details...</p>
      </div>
    );
  }

  // 2. Error State
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl shadow-gray-200/50">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Something went wrong</h3>
          <p className="mt-2 text-sm text-gray-500">{error?.message || "Could not retrieve order details."}</p>
        </div>
      </div>
    );
  }

  // Extract the order object out of your API response safely
  const order = data?.order;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        
        {/* Success Header */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Order Confirmed!
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Thank you for your purchase, {order?.userId?.fullName || "customer"}.
          </p>
        </div>

        {/* Order Receipt Card */}
        <div className="mt-10 overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/40">
          
          {/* Status Bar */}
          <div className="bg-slate-950 px-6 py-4 flex items-center justify-between text-white">
            <span className="text-xs font-mono tracking-wider uppercase text-slate-400">Order ID: {id?.slice(-8)}</span>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
              {order?.paymentStatus || "PAID"}
            </span>
          </div>

          <div className="p-6 space-y-6">
            {/* Customer Details */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Customer Details</h3>
              <div className="mt-2 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">{order?.userId?.fullName}</p>
                <p className="text-slate-500">{order?.userId?.email}</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Items Purchased */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Items Ordered</h3>
              <ul className="divide-y divide-slate-100">
                {order?.foods?.map((item) => (
                  <li key={item._id} className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        🍔
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {item.foodId?.name || "Delicious Food Item"}
                        </p>
                        <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {item.foodId?.price ? `$${(item.foodId.price * item.quantity).toFixed(2)}` : "--"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="border-slate-100" />

            {/* Meta Timestamp */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Placed On</span>
              <span>{order?.createdAt ? new Date(order.createdAt).toLocaleString() : ""}</span>
            </div>

          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          
          <a  href="/"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Continue Browsing
          </a>
        </div>

      </div>
    </div>
  );
};

export default Success;