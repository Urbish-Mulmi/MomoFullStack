
import api from './apiInstance.js'

export const addFood = async (data) => {
  try {
    // Pass the headers configuration object as the 3rd argument in api.post()
    const res = await api.post("/foods/create", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Food Created Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Failed to create food :", error.response?.data || error.message);
    throw error;
  }
};

export const getFoods = async () => {
  try {
    const res = await api.get("/foods");
    console.log("Get Foods Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Get Foods Error:", error.response?.data || error.message);
    throw error;
  }
};


// export const createFood = async (data) => {
  //   try {
    //     const res = await api.post("/foods/create", data);
    //     console.log("Food Created Success:", res.data);
    //     return res.data;
    //   } catch (error) {
      //     console.error("Failed to create food :", error.response?.data || error.message);
      //     throw error;
      //   }
      // };

      export const deleteFood = async (id) => {
        try {
          console.log("ID:", id);
          const res = await api.delete(`/foods/${id}`);          
          console.log("Delete food", res.data);
          return res.data;
        } catch (error) {
          console.error("Delete Foods Error:", error.response?.data || error.message);
          throw error;
        }
      };
      export const editFood = async (id,data) => {
        try {          
          const res = await api.patch(`/foods/${id}`, data);          
          console.log("Edit food", res.data);
          return res.data;
        } catch (error) {
          console.error("Edit Foods Error:", error.response?.data || error.message);
          throw error;
        }
      };
