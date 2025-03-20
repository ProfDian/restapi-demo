import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";

const CrudDialog = ({ isOpen, mode, product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nama: "",
    stok: 0,
    link_gambar: "",
  });

  useEffect(() => {
    if (product && mode === "edit") {
      setFormData({
        nama: product.nama || "",
        stok: product.stok || 0,
        link_gambar: product.link_gambar || "",
      });
    } else {
      // Reset form when opening in create mode
      setFormData({
        nama: "",
        stok: 0,
        link_gambar: "",
      });
    }
  }, [product, mode, isOpen]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "stok" ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
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
        backdropFilter: "blur(3px)",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          animation: "zoomIn 0.3s ease-out forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>
          {`
            @keyframes zoomIn {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
          `}
        </style>

        <div
          style={{
            padding: "20px",
            backgroundColor: "#2196f3",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0, color: "white", fontSize: "18px" }}>
              {mode === "edit" ? "Edit Produk" : "Tambah Produk Baru"}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                fontSize: "18px",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "rgba(255,255,255,0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255,255,255,0.2)";
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div style={{ padding: "0px 20px 20px 20px" }}>
          <ProductForm
            formData={formData}
            handleFormChange={handleFormChange}
            handleSubmit={handleSubmit}
            currentProduct={mode === "edit" ? product : null}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default CrudDialog;
