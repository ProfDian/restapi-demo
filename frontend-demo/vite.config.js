import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Mengizinkan host ngrok
    allowedHosts: [
      "7073-114-10-23-233.ngrok-free.app",
      // Tambahkan pola umum untuk host ngrok untuk menghindari konfigurasi ulang
      ".ngrok-free.app",
      ".ngrok.io",
    ],
    // Jika Anda ingin server Vite bisa diakses dari luar
    host: "0.0.0.0",
    // Port default Vite
    port: 5173,
  },
});
