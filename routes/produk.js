const express = require("express");
const db = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Get All Produk
router.get("/", authenticateToken, (req, res) => {
  db.query("SELECT * FROM produk", (err, results) => {
    if (err)
      return res.status(500).json({ message: "Error retrieving products" });
    res.json(results);
  });
});

// Add Produk
router.post("/", authenticateToken, (req, res) => {
  const { nama, stok, link_gambar } = req.body;
  const sql = "INSERT INTO produk (nama, stok, link_gambar) VALUES (?, ?, ?)";

  db.query(sql, [nama, stok, link_gambar], (err) => {
    if (err) return res.status(500).json({ message: "Error adding product" });
    res.status(201).json({ message: "Product added successfully" });
  });
});

// Update Produk
// Update Produk dengan debugging
router.put("/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { nama, stok, link_gambar } = req.body;

  console.log(`[DEBUG] Request update produk dengan ID: ${id}`);
  console.log(`[DEBUG] Body request:`, req.body);

  // Ambil data produk yang ada terlebih dahulu
  db.query("SELECT * FROM produk WHERE id_barang = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching product" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const currentProduct = results[0];

    // Gunakan nilai yang baru jika ada, atau nilai yang lama jika tidak ada
    const newNama = nama !== undefined ? nama : currentProduct.nama;
    const newStok = stok !== undefined ? stok : currentProduct.stok;
    const newLinkGambar =
      link_gambar !== undefined ? link_gambar : currentProduct.link_gambar;

    // Update dengan nilai yang sudah diproses
    const sql =
      "UPDATE produk SET nama = ?, stok = ?, link_gambar = ? WHERE id_barang = ?";

    db.query(sql, [newNama, newStok, newLinkGambar, id], (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating product" });
      }

      res.status(200).json({ message: "Product updated successfully" });
    });
  });
});

router.delete("/:id", authenticateToken, (req, res) => {
  const { id } = req.params;

  console.log(`[DEBUG] Request delete produk dengan ID: ${id}`);

  // Periksa apakah produk ada
  db.query("SELECT * FROM produk WHERE id_barang = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching product" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Hapus produk
    db.query("DELETE FROM produk WHERE id_barang = ?", [id], (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting product" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    });
  });
});

module.exports = router;
