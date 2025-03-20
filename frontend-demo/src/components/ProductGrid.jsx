import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onEdit, onDelete }) => {
  if (!products.length) {
    return (
      <div
        style={{
          gridColumn: "1 / -1",
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          color: "#666",
        }}
      >
        <p style={{ fontSize: "18px", margin: "0" }}>Tidak ada produk</p>
        <p style={{ marginTop: "10px" }}>
          Klik tombol "Tambah Produk" untuk menambahkan produk baru
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        margin: "20px 0",
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id_barang}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
