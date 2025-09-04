import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

export const signup = (data) => axios.post(API_URL + "signup", data);
export const verifyOtp = (data) => axios.post(API_URL + "verify-otp", data);
export const login = (data) => axios.post(API_URL + "login", data);
export const forgotPassword = (data) => axios.post(API_URL + "forgot-password", data);
export const resetPassword = (data) => axios.post(API_URL + "reset-password", data);
