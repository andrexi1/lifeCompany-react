// src/pages/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfiles } from "../context/ProfilesContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { profiles } = useProfiles();
  const navigate = useNavigate();

  const profileCount = profiles.length;
  const lastCreated = profiles.length > 0 
    ? new Date(profiles[profiles.length - 1].createdAt).toLocaleDateString("es-CO")
    : "Ninguno";

  const containerStyle = {
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)", // fondo elegante en degradado
    minHeight: "100vh",
    padding: "2rem"
  };

  const cardStyle = {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    marginBottom: "1.5rem"
  };

  const buttonStyle = {
    fontSize: "1.1rem",
    padding: "14px 28px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
  };

  const buttonHoverStyle = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...cardStyle, background: "linear-gradient(135deg, #0066cc, #3b82f6)", color: "white" }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <p>Bienvenido, {user?.email || "Usuario"}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", margin: "2rem 0" }}>
        <div style={cardStyle}>
          <h3>Perfiles totales</h3>
          <p style={{ fontSize: "3rem", fontWeight: "bold", margin: "0.5rem 0" }}>{profileCount}</p>
        </div>

        <div style={cardStyle}>
          <h3>Último creado</h3>
          <p style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>{lastCreated}</p>
        </div>
      </div>

      {/* Botones principales */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
        <button
          className="btn btn-primary"
          style={buttonStyle}
          onMouseOver={e => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
          onClick={() => navigate("/create-profile")}
        >
          Crear Nuevo Perfil
        </button>

        <button
          className="btn btn-primary"
          style={buttonStyle}
          onMouseOver={e => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
          onClick={() => navigate("/profiles")}
        >
          Ver Todos los Perfiles
        </button>

        <button
          className="btn btn-success"
          style={buttonStyle}
          onMouseOver={e => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
          onClick={() => navigate("/statistics")}
        >
          Ver Estadísticas
        </button>

        <button
          className="btn btn-danger"
          style={{ ...buttonStyle, marginLeft: "auto" }}
          onMouseOver={e => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
          onClick={logout}
        >
          Cerrar Sesión
        </button>
      </div>

      <div style={cardStyle}>
        <h2>Perfiles Recientes</h2>
        {profiles.length === 0 ? (
          <p>No hay perfiles creados todavía.</p>
        ) : (
          profiles.slice(0, 5).map(profile => (
            <div key={profile.id} style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
              <strong>{profile.name}</strong> - Edad: {profile.age}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
