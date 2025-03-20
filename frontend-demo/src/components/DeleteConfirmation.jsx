import React from "react";

const DeleteConfirmation = ({ product, onCancel, onConfirm }) => {
  if (!product) return null;

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
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          maxWidth: "400px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Konfirmasi Hapus</h3>
        <p>
          Apakah Anda yakin ingin menghapus produk{" "}
          <strong>{product.nama}</strong>?
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
            onClick={onCancel}
            style={{
              padding: "8px 16px",
              background: "#e0e0e0",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 16px",
              background: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
