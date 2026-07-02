import api from "./apiInstance";

// Sign Up
export const signUpUser = async (data) => {
  try {
    const res = await api.post("/users/sign-up", data);
    console.log("Sign Up Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Sign Up Error:", error.response?.data || error.message);
    throw error; // Re-throw so the calling component knows it failed
  }
};

// Login
export const loginUser = async (data) => {
  try {
    const res = await api.post("/users/login", data);
    console.log("Login Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// Logout
export const logoutUser = async () => {
  try {
    const res = await api.post("/users/logout");
    console.log("Logout Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Logout Error:", error.response?.data || error.message);
    throw error;
  }
};

// Get Current User (Profile/Session Check)
export const getUser = async () => {
  try {
    const res = await api.get("/users/get-me");
    console.log("Get User Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("Get User Error:", error.response?.data || error.message);
    throw error;
  }
};