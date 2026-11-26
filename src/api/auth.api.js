import api from "./axios";

export const login = (payload) =>
  api.post("/auth/login", payload);

export const logout = () =>
  api.post("/auth/logout");

export const getMe = () =>
  api.get("/auth/me");

export const sendOtp = (email) =>
  api.post("/auth/forgot-password/send-otp", {
    email,
  });

export const verifyOtp = (payload) =>
  api.post("/auth/forgot-password/verify-otp", payload);