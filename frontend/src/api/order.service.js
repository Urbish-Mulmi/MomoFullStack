import api from "./apiInstance"

export const createOrder  = async (data) => {
   try {
    const res = await api.post("/orders/create", data);
    console.log("Order Created Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to create order :", error.response?.data || error.message);
    throw error;
  }
  
}

export const getOrder = async (id) =>{
  const res = await api.get(`/orders/${id}`);
  return res.data;
}