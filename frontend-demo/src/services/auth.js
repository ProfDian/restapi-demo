// auth.js
import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    }
    return null;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Login gagal");
  }
};

export const register = async (nama, email, password) => {
  try {
    const response = await api.post("/auth/register", {
      nama,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Registrasi gagal");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
