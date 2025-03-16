import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/product";
import { logout } from "../services/auth";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    stok: 0,
    link_gambar: "",
  });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError("");
    } catch (err) {
      setError("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAddClick = () => {
    setCurrentProduct(null);
    setFormData({
      nama: "",
      stok: 0,
      link_gambar: "",
    });
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setFormData({
      nama: product.nama,
      stok: product.stok,
      link_gambar: product.link_gambar || "",
    });
    setShowForm(true);
  };

  const handleDeleteClick = (product) => {
    setConfirmDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;

    try {
      await deleteProduct(confirmDelete.id_barang);
      setConfirmDelete(null);
      fetchProducts();
    } catch (err) {
      setError("Gagal menghapus produk");
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stok" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id_barang, formData);
      } else {
        await addProduct(formData);
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError("Gagal menyimpan produk");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Manajemen Produk</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "5px 10px",
            background: "#f44336",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {error && (
        <div
          style={{
            background: "#ffeeee",
            color: "red",
            padding: "10px",
            marginBottom: "15px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleAddClick}
          style={{
            padding: "8px 12px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Tambah Produk
        </button>
      </div>

      {/* Konfirmasi Delete */}
      {confirmDelete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              maxWidth: "400px",
            }}
          >
            <h3>Konfirmasi Hapus</h3>
            <p>
              Apakah Anda yakin ingin menghapus produk{" "}
              <strong>{confirmDelete.nama}</strong>?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
                gap: "10px",
              }}
            >
              <button
                onClick={handleCancelDelete}
                style={{
                  padding: "8px 12px",
                  background: "#ccc",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                style={{
                  padding: "8px 12px",
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form tambah/edit produk */}
      {showForm && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
          }}
        >
          <h3>{currentProduct ? "Edit Produk" : "Tambah Produk"}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Nama Produk:
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleFormChange}
                style={{ width: "100%", padding: "8px" }}
                required
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Stok:
              </label>
              <input
                type="number"
                name="stok"
                value={formData.stok}
                onChange={handleFormChange}
                style={{ width: "100%", padding: "8px" }}
                required
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                URL Gambar:
              </label>
              <input
                type="text"
                name="link_gambar"
                value={formData.link_gambar}
                onChange={handleFormChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  padding: "8px 12px",
                  background: "#4a90e2",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {currentProduct ? "Update" : "Simpan"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: "8px 12px",
                  background: "#ccc",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f2f2f2" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Nama
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Stok
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Gambar
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id_barang}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {product.nama}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {product.stok}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {product.link_gambar ? (
                      <img
                        src={product.link_gambar}
                        alt={product.nama}
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                    ) : (
                      "Tidak ada gambar"
                    )}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button
                        onClick={() => handleEditClick(product)}
                        style={{
                          padding: "5px 10px",
                          background: "#FFC107",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        style={{
                          padding: "5px 10px",
                          background: "#f44336",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Tidak ada produk
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Products;
