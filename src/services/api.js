import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-api-3wara.vercel.app/",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;