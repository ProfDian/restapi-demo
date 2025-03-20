import React, { useState } from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  // Fungsi untuk menampilkan placeholder image jika gambar tidak valid
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x180?text=No+Image";
  };

  return (
    <div
      className="product-card"
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 20px rgba(0,0,0,0.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
    >
      <div
        style={{
          position: "relative",
          paddingTop: "60%", // 60% aspect ratio (5:3)
          overflow: "hidden",
        }}
      >
        <img
          src={
            product.link_gambar ||
            "https://via.placeholder.com/300x180?text=No+Image"
          }
          alt={product.nama}
          onError={handleImageError}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        />
      </div>

      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            style={{
              margin: "0 0 12px 0",
              color: "#333",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {product.nama}
          </h3>

          <div
            style={{
              display: "inline-block",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                backgroundColor: product.stok > 0 ? "#e8f5e9" : "#ffebee",
                color: product.stok > 0 ? "#2e7d32" : "#c62828",
                padding: "4px 10px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "500",
              }}
            >
              Stok: {product.stok}
            </span>
          </div>

          {product.deskripsi && (
            <div
              style={{
                margin: "12px 0",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  lineHeight: "1.6",
                  maxHeight: expanded ? "none" : "80px",
                  overflow: expanded ? "visible" : "hidden",
                  position: "relative",
                }}
              >
                {product.deskripsi}
                {!expanded && product.deskripsi.length > 120 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "40px",
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
                    }}
                  ></div>
                )}
              </div>
              {product.deskripsi.length > 120 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2196f3",
                    padding: "5px 0",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    fontWeight: "500",
                    display: "block",
                    marginTop: "5px",
                    textAlign: "left",
                  }}
                >
                  {expanded ? "Sembunyikan" : "Selengkapnya"}
                </button>
              )}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <button
            onClick={() => onEdit(product)}
            style={{
              flex: "1",
              padding: "10px 0",
              background: "#FFC107",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#FFB300";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#FFC107";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product)}
            style={{
              flex: "1",
              padding: "10px 0",
              background: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#E53935";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#f44336";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
