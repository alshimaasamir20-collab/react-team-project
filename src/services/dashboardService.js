import api from "./api";

export async function getDashboardStats() {
  const response = await api.get("/orders/admin/dashboard");

  return response.data.dashboard;
}