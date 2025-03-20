import React, { useEffect } from "react";

const SuccessToast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "15px 20px",
        background: "linear-gradient(135deg, #4CAF50, #388E3C)",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        minWidth: "250px",
        animation: "slideInRight 0.3s ease-out forwards",
      }}
    >
      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <span style={{ fontSize: "20px", marginRight: "12px" }}>✅</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "600", marginBottom: "2px" }}>Sukses</div>
        <div style={{ fontSize: "14px", opacity: 0.9 }}>{message}</div>
      </div>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
          padding: "0 0 0 10px",
          opacity: 0.7,
        }}
        onMouseOver={(e) => (e.target.style.opacity = 1)}
        onMouseOut={(e) => (e.target.style.opacity = 0.7)}
      >
        ×
      </button>
    </div>
  );
};

export default SuccessToast;
