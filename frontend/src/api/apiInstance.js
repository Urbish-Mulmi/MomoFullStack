import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:9000/api",
  withCredentials: true,// this allows cookies set to be sent in each request(enable clearance pass to be in request)
});

export default api;