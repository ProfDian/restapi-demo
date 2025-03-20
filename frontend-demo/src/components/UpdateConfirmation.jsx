import React from "react";

const UpdateConfirmation = ({ isOpen, product, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(3px)",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          animation: "slideUp 0.3s ease-out forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            color: "#2196f3",
          }}
        >
          <span style={{ fontSize: "24px", marginRight: "10px" }}>✅</span>
          <h3 style={{ margin: 0, color: "#333" }}>Konfirmasi Update</h3>
        </div>

        <hr
          style={{
            border: "none",
            borderBottom: "1px solid #eee",
            margin: "15px 0",
          }}
        />

        <p style={{ color: "#666", lineHeight: 1.5 }}>
          Apakah Anda yakin ingin mengupdate produk{" "}
          <strong style={{ color: "#333" }}>{product?.nama}</strong>?
        </p>
        <p style={{ color: "#888", fontSize: "14px", marginTop: "5px" }}>
          Perubahan ini akan disimpan di database.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "25px",
            gap: "15px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 16px",
              background: "#f5f5f5",
              color: "#333",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#e0e0e0";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#f5f5f5";
            }}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "10px 16px",
              background: "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#1976d2";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#2196f3";
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateConfirmation;
