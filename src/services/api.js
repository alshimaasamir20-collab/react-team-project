





// الكود ده بيعمل إيه؟
// - بيقرأ الـToken المحفوظ باسم token.
// - لو موجود بيضيفه في الأوثريزاشن بصيغة Bearer.
// - بالتالي طلب /orders/admin/dashboard هيبعت الـToken تلقائيًا.
// مهم: الكود ده مش بيعمل Login لوحده؛ هو بس بيبعت Token موجود بالفعل.



import axios from "axios";

const api = axios.create({
  baseURL: "https://e-commerce-api-3wara.vercel.app",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});

export default api;