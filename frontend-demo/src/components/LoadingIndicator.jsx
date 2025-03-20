import React from "react";

const LoadingIndicator = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        fontSize: "18px",
        color: "#666",
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #3498db",
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
      <p>Loading...</p>
    </div>
  );
};

export default LoadingIndicator;
