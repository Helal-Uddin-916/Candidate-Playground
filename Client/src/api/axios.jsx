import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: "admin",
    password: import.meta.env.VITE_ADMIN_PASSWORD,
  },
});

export default api;
