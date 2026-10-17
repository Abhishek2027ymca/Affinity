import axios from "axios";

// one place for the backend URL; every request sends the auth cookie
export const API_URL = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default api;
