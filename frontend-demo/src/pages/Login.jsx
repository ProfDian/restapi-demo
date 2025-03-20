import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/products");
    } catch (err) {
      setError("Login gagal. Periksa email dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "40px 30px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }

            .input-field:focus-within {
              border-color: #2196f3;
              box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
            }
          `}
        </style>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          Login
        </h2>

        {error && (
          <div
            style={{
              background: "#ffebee",
              color: "#c62828",
              padding: "12px 15px",
              marginBottom: "25px",
              borderRadius: "8px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              animation: "fadeIn 0.3s ease-out",
            }}
          >
            <span style={{ marginRight: "8px", fontSize: "18px" }}>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
                fontSize: "15px",
              }}
            >
              Email
            </label>
            <div
              className="input-field"
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  padding: "0 15px",
                  color: "#888",
                  fontSize: "18px",
                }}
              >
                📧
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: "14px 15px 14px 0",
                  border: "none",
                  fontSize: "16px",
                  outline: "none",
                  backgroundColor: "transparent",
                }}
                placeholder="nama@example.com"
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#555",
                fontSize: "15px",
              }}
            >
              Password
            </label>
            <div
              className="input-field"
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  padding: "0 15px",
                  color: "#888",
                  fontSize: "18px",
                }}
              >
                🔒
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  flex: 1,
                  padding: "14px 15px 14px 0",
                  border: "none",
                  fontSize: "16px",
                  outline: "none",
                  backgroundColor: "transparent",
                }}
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading ? "#90CAF9" : "#2196f3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "wait" : "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {loading && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "30px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  animation: "shimmer 1.5s infinite",
                  transform: "skewX(-20deg)",
                }}
              >
                <style>
                  {`
                    @keyframes shimmer {
                      0% { transform: translateX(-100%) skewX(-20deg); }
                      100% { transform: translateX(1000%) skewX(-20deg); }
                    }
                  `}
                </style>
              </span>
            )}
            {loading ? "Menghubungkan..." : "Login"}
          </button>
        </form>

        <div style={{ marginTop: "30px", textAlign: "center", color: "#666" }}>
          <p>
            Belum punya akun?{" "}
            <Link
              to="/register"
              style={{
                color: "#2196f3",
                fontWeight: "600",
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
              Register
            </Link>
          </p>
          <Link
            to="/"
            style={{
              color: "#777",
              fontSize: "14px",
              textDecoration: "none",
              display: "inline-block",
              marginTop: "10px",
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#555";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#777";
            }}
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
