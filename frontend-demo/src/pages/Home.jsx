import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

function Home() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "100px auto",
        padding: "30px",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Selamat Datang di Aplikasi Manajemen Produk</h1>
      <p style={{ margin: "20px 0" }}>
        Aplikasi sederhana untuk mengelola produk Anda
      </p>

      <button
        onClick={() => navigate(authenticated ? "/products" : "/login")}
        style={{
          padding: "10px 20px",
          background: "#4a90e2",
          color: "white",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {authenticated ? "Lihat Produk" : "Login"}
      </button>
    </div>
  );
}

export default Home;
