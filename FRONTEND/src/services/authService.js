import axios from "axios";

const API = "https://shortify-backend-kq04.onrender.com/api/auth";

axios.defaults.withCredentials = true;

export const registerUser = async (userData) => {
  const response = await axios.post(`${API}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API}/login`, userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${API}/logout`);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API}/me`);
  return response.data;
};