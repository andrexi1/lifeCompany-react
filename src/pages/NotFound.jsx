// src/pages/NotFound.jsx
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)",
    color: "white",
    textAlign: "center",
    padding: "2rem"
  };

  const buttonStyle = {
    marginTop: "2rem",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    background: "#0066cc",
    cursor: "pointer",
    fontSize: "1.1rem",
    color: "white"
  };

  return (
    <div style={containerStyle}>
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <button style={buttonStyle} onClick={() => navigate("/login")}>
        Volver al inicio
      </button>
    </div>
  );
}
