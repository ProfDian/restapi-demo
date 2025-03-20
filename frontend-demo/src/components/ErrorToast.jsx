import React, { useEffect } from "react";

const ErrorToast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);

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
        background: "linear-gradient(135deg, #f44336, #d32f2f)",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
        zIndex: 1100,
        display: "flex",
        alignItems: "center",
        minWidth: "250px",
        animation: "shakeAndSlide 0.5s ease-out forwards",
      }}
    >
      <style>
        {`
          @keyframes shakeAndSlide {
            0% {
              transform: translateX(100%);
            }
            60% {
              transform: translateX(-5px);
            }
            80% {
              transform: translateX(5px);
            }
            100% {
              transform: translateX(0);
            }
          }
        `}
      </style>
      <span style={{ fontSize: "20px", marginRight: "12px" }}>⚠️</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "600", marginBottom: "2px" }}>Error</div>
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

export default ErrorToast;
