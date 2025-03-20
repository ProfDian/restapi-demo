import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

function Home() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "60px 40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          textAlign: "center",
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
            
            .btn-primary {
              background: linear-gradient(135deg, #2196f3, #1976d2);
              color: white;
              border: none;
              border-radius: 8px;
              padding: 14px 32px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 12px rgba(33, 150, 243, 0.3);
            }
            
            .btn-primary:hover {
              transform: translateY(-3px);
              box-shadow: 0 6px 15px rgba(33, 150, 243, 0.4);
            }
            
            .btn-primary:active {
              transform: translateY(0);
              box-shadow: 0 4px 8px rgba(33, 150, 243, 0.3);
            }
            
            .icon {
              font-size: 80px;
              margin-bottom: 20px;
              animation: float 4s ease-in-out infinite;
              display: inline-block;
            }
          `}
        </style>

        <div className="icon">📦</div>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#333",
            lineHeight: "1.2",
          }}
        >
          Aplikasi Manajemen Produk
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#666",
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          Selamat datang di aplikasi untuk mengelola inventaris produk Anda
          dengan mudah, cepat, dan efisien.
        </p>

        <div style={{ marginTop: "30px" }}>
          <button
            onClick={() => navigate(authenticated ? "/products" : "/login")}
            className="btn-primary"
          >
            {authenticated ? "Lihat Produk" : "Login"}
          </button>

          {!authenticated && (
            <p style={{ marginTop: "20px", color: "#777", fontSize: "15px" }}>
              Belum punya akun?{" "}
              <span
                onClick={() => navigate("/register")}
                style={{
                  color: "#2196f3",
                  fontWeight: "600",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = "#1976d2";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#2196f3";
                }}
              >
                Register sekarang
              </span>
            </p>
          )}
        </div>

        <div
          style={{
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "30px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              maxWidth: "200px",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>✨</div>
            <h3 style={{ marginBottom: "10px", color: "#444" }}>
              Manajemen Mudah
            </h3>
            <p style={{ color: "#777", fontSize: "14px" }}>
              Kelola produk Anda dengan interface yang mudah digunakan
            </p>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "20px",
              maxWidth: "200px",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>🔒</div>
            <h3 style={{ marginBottom: "10px", color: "#444" }}>
              Aman & Terpercaya
            </h3>
            <p style={{ color: "#777", fontSize: "14px" }}>
              Data produk Anda tersimpan dengan aman
            </p>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "20px",
              maxWidth: "200px",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "15px" }}>📱</div>
            <h3 style={{ marginBottom: "10px", color: "#444" }}>Responsif</h3>
            <p style={{ color: "#777", fontSize: "14px" }}>
              Akses dari perangkat mana saja, kapan saja
            </p>
          </div>
        </div>

        <footer
          style={{
            marginTop: "60px",
            padding: "20px 0 0",
            borderTop: "1px solid #eee",
            color: "#999",
            fontSize: "14px",
          }}
        >
          <p>&copy; {new Date().getFullYear()} Aplikasi Manajemen Produk</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
