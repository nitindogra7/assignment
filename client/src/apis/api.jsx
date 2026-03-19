import axios from "axios";

const api = axios.create({
  baseURL: "https://assignment-tlx3.onrender.com",
  withCredentials: true,
});

export default api;