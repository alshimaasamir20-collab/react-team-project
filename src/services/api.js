
import axios from "axios";




// الكود ده بيعمل إيه؟
// - بيقرأ الـToken المحفوظ باسم token.
// - لو موجود بيضيفه في الأوثريزاشن بصيغة Bearer.
// - بالتالي طلب /orders/admin/dashboard هيبعت الـToken تلقائيًا.
// مهم: الكود ده مش بيعمل Login لوحده؛ هو بس بيبعت Token موجود بالفعل.



const api = axios.create({
  baseURL: "https://e-commerce-api-3wara.vercel.app/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;