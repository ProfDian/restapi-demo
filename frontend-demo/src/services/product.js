// product.js
import api from "./api";

export const getProducts = async () => {
  try {
    const response = await api.get("/produk");
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Gagal mendapatkan produk");
  }
};

export const addProduct = async (product) => {
  try {
    const response = await api.post("/produk", product);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Gagal menambahkan produk");
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await api.put(`/produk/${id}`, product);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Gagal mengupdate produk");
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/produk/${id}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Gagal menghapus produk");
  }
};
