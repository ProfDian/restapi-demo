import React from "react";

const ProductForm = ({
  formData,
  handleFormChange,
  handleSubmit,
  currentProduct,
  onCancel,
}) => {
  return (
    <div
      style={{
        marginBottom: "25px",
        padding: "24px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #2196f3, #1976d2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "12px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {currentProduct ? "🖊️" : "➕"}
        </div>
        <h3
          style={{
            margin: 0,
            color: "#333",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          {currentProduct ? "Edit Produk" : "Tambah Produk"}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                color: "#444",
                fontSize: "0.85rem",
              }}
            >
              Nama Produk <span style={{ color: "#e53935" }}>*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleFormChange}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "15px",
                backgroundColor: "#fafafa",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2196f3";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 3px rgba(33, 150, 243, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ddd";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
              placeholder="Nama produk"
              required
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                color: "#444",
                fontSize: "0.85rem",
              }}
            >
              Stok <span style={{ color: "#e53935" }}>*</span>
            </label>
            <input
              type="number"
              name="stok"
              value={formData.stok}
              onChange={handleFormChange}
              min="0"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "15px",
                backgroundColor: "#fafafa",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2196f3";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 3px rgba(33, 150, 243, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ddd";
                e.target.style.backgroundColor = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
              placeholder="Jumlah stok"
              required
            />
          </div>

          <div style={{ gridColumn: "1 / 3" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
                color: "#444",
                fontSize: "0.85rem",
              }}
            >
              URL Gambar
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "6px",
                backgroundColor: "#fafafa",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#2196f3";
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(33, 150, 243, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#ddd";
                e.currentTarget.style.backgroundColor = "#fafafa";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                style={{
                  backgroundColor: "#f1f1f1",
                  padding: "10px",
                  color: "#666",
                  borderRight: "1px solid #ddd",
                  fontSize: "15px",
                }}
              >
                🔗
              </span>
              <input
                type="text"
                name="link_gambar"
                value={formData.link_gambar}
                onChange={handleFormChange}
                placeholder="https://example.com/image.jpg"
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  border: "none",
                  fontSize: "15px",
                  backgroundColor: "transparent",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            marginTop: "25px",
            borderTop: "1px solid #f0f0f0",
            paddingTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "10px 18px",
              background: "transparent",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "15px",
              color: "#666",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f5f5f5";
              e.target.style.borderColor = "#ccc";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.borderColor = "#ddd";
            }}
          >
            Batal
          </button>
          <button
            type="submit"
            style={{
              padding: "10px 22px",
              background: "linear-gradient(135deg, #2196f3, #1976d2)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "15px",
              boxShadow: "0 2px 6px rgba(33, 150, 243, 0.3)",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.boxShadow = "0 4px 8px rgba(33, 150, 243, 0.4)";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.target.style.boxShadow = "0 2px 6px rgba(33, 150, 243, 0.3)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            {currentProduct ? "Update" : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
