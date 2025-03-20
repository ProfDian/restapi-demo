import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/product";
import { logout } from "../services/auth";

// Import komponen-komponen
import ProductCard from "../components/ProductCard";
import DeleteConfirmation from "../components/DeleteConfirmation";
import UpdateConfirmation from "../components/UpdateConfirmation";
import SuccessToast from "../components/SuccessToast";
import ErrorToast from "../components/ErrorToast";
import CrudDialog from "../components/CrudDialog";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmUpdate, setConfirmUpdate] = useState(null);
  const [crudDialog, setCrudDialog] = useState({
    isOpen: false,
    mode: "create",
    product: null,
  });
  const [tempFormData, setTempFormData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // CRUD Dialog Handlers
  const openCreateDialog = () => {
    setCrudDialog({
      isOpen: true,
      mode: "create",
      product: null,
    });
  };

  const openEditDialog = (product) => {
    setCrudDialog({
      isOpen: true,
      mode: "edit",
      product: product,
    });
  };

  const closeCrudDialog = () => {
    setCrudDialog({
      ...crudDialog,
      isOpen: false,
    });
  };

  const handleCrudSubmit = (formData) => {
    if (crudDialog.mode === "edit") {
      // Show update confirmation
      setConfirmUpdate(crudDialog.product);
      setTempFormData(formData);
    } else {
      // Directly create new product
      handleCreateProduct(formData);
    }
    closeCrudDialog();
  };

  const handleCreateProduct = async (formData) => {
    try {
      await addProduct(formData);
      setSuccessMessage("Produk berhasil ditambahkan!");
      fetchProducts();
    } catch (err) {
      setErrorMessage("Gagal menambahkan produk");
    }
  };

  const handleUpdateProduct = async () => {
    if (!confirmUpdate || !tempFormData) return;

    try {
      await updateProduct(confirmUpdate.id_barang, tempFormData);
      setSuccessMessage("Produk berhasil diupdate!");
      fetchProducts();
    } catch (err) {
      setErrorMessage("Gagal mengupdate produk");
    } finally {
      setConfirmUpdate(null);
      setTempFormData(null);
    }
  };

  const handleDeleteClick = (product) => {
    setConfirmDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;

    try {
      await deleteProduct(confirmDelete.id_barang);
      setSuccessMessage("Produk berhasil dihapus!");
      fetchProducts();
    } catch (err) {
      setErrorMessage("Gagal menghapus produk");
    } finally {
      setConfirmDelete(null);
    }
  };

  // Toast Handlers
  const clearErrorMessage = () => setErrorMessage("");
  const clearSuccessMessage = () => setSuccessMessage("");

  // Loading component
  const LoadingIndicator = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 0",
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: "50px",
          height: "50px",
          border: "4px solid rgba(0, 0, 0, 0.1)",
          borderLeftColor: "#2196f3",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <p style={{ marginTop: "20px", color: "#666", fontSize: "18px" }}>
        Loading...
      </p>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div
      style={{
        textAlign: "center",
        padding: "50px 20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        color: "#666",
        marginTop: "20px",
      }}
    >
      <div style={{ fontSize: "60px", marginBottom: "20px" }}>📦</div>
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "10px",
          color: "#444",
        }}
      >
        Tidak ada produk
      </h3>
      <p style={{ fontSize: "16px", maxWidth: "500px", margin: "0 auto 20px" }}>
        Anda belum memiliki produk. Klik tombol di bawah untuk menambahkan
        produk baru
      </p>
      <button
        onClick={openCreateDialog}
        style={{
          padding: "12px 25px",
          background: "#2196f3",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "500",
          fontSize: "16px",
          display: "inline-flex",
          alignItems: "center",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.background = "#1976d2";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#2196f3";
          e.target.style.transform = "translateY(0)";
        }}
      >
        <span style={{ marginRight: "8px" }}>+</span> Tambah Produk
      </button>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toasts */}
      <SuccessToast
        message={successMessage}
        isVisible={!!successMessage}
        onClose={clearSuccessMessage}
      />

      <ErrorToast
        message={errorMessage}
        isVisible={!!errorMessage}
        onClose={clearErrorMessage}
      />

      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          padding: "20px",
          background: "linear-gradient(135deg, #2196f3, #1976d2)",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          position: "sticky",
          top: "20px",
          zIndex: 90,
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#fff",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Manajemen Produk
        </h1>
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={openCreateDialog}
            style={{
              padding: "10px 20px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              fontWeight: "500",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#43A047";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#4CAF50";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <span style={{ marginRight: "8px", fontSize: "16px" }}>+</span>{" "}
            Tambah Produk
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(255,255,255,0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* CRUD Dialog */}
      <CrudDialog
        isOpen={crudDialog.isOpen}
        mode={crudDialog.mode}
        product={crudDialog.product}
        onClose={closeCrudDialog}
        onSubmit={handleCrudSubmit}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmation
        product={confirmDelete}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Update Confirmation */}
      <UpdateConfirmation
        isOpen={!!confirmUpdate}
        product={confirmUpdate}
        onClose={() => {
          setConfirmUpdate(null);
          setTempFormData(null);
        }}
        onConfirm={handleUpdateProduct}
      />

      {/* Content Area */}
      <main style={{ flexGrow: 1 }}>
        {loading ? (
          <LoadingIndicator />
        ) : products.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "25px",
              margin: "20px 0",
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id_barang}
                product={product}
                onEdit={() => openEditDialog(product)}
                onDelete={() => handleDeleteClick(product)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          margin: "40px 0 20px",
          padding: "20px",
          borderTop: "1px solid #eee",
          color: "#888",
          fontSize: "14px",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} Manajemen Produk. All Rights
          Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Products;
