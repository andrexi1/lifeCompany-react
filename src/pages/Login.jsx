import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loggedUser = await login(email, password);

      if (loggedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const formContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)",
    padding: "1rem"
  };

  const formStyle = {
    background: "#fff",
    padding: "3rem",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center"
  };

  const inputStyle = { width: "100%", padding: "12px 16px", margin: "0.8rem 0", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem" };
  const buttonStyle = { width: "100%", padding: "12px 0", margin: "0.8rem 0", borderRadius: "8px", border: "none", fontSize: "1.1rem", fontWeight: "500", cursor: "pointer", transition: "all 0.2s ease" };
  const hoverEffect = { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(0,0,0,0.2)" };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ marginBottom: "1.5rem" }}>Iniciar Sesión</h2>

        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />

        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        <button type="submit" style={{ ...buttonStyle, background: "#0066cc", color: "#fff" }} onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)} onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}>
          Entrar
        </button>
      </form>
    </div>
  );
}
