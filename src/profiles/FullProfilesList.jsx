import { useNavigate } from "react-router-dom";
import { useProfiles } from "../context/ProfilesContext";

export default function FullProfilesList() {
  const { profiles, deleteProfile } = useProfiles();
  const navigate = useNavigate();

  const containerStyle = {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)",
    minHeight: "100vh"
  };

  const cardStyle = {
    borderRadius: "12px",
    padding: "1.5rem",
    background: "#ffffff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default"
  };

  const buttonStyle = {
    padding: "10px 24px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease"
  };

  const hoverEffect = {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
  };

  if (profiles.length === 0) {
    return (
      <div style={{ 
        padding: "4rem 2rem", 
        textAlign: "center", 
        background: "#f8f9fa", 
        borderRadius: "12px" 
      }}>
        <h2>Aún no hay perfiles creados</h2>
        <p style={{ color: "#666", margin: "1rem 0 2rem" }}>
          Crea tu primer perfil para comenzar a registrar datos
        </p>
        <button 
          onClick={() => navigate("/create-profile")}
          style={{ 
            ...buttonStyle,
            background: "#0066cc",
            color: "white"
          }}
          onMouseOver={e => Object.assign(e.target.style, hoverEffect)}
          onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
        >
          Crear mi primer perfil
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 style={{ color: "#ffffff" }}>Lista Completa de Perfiles ({profiles.length})</h2>
        
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => navigate("/create-profile")}
            style={{ ...buttonStyle, background: "#0066cc", color: "white" }}
            onMouseOver={e => Object.assign(e.target.style, hoverEffect)}
            onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
          >
            + Nuevo Perfil
          </button>
          
          <button
            onClick={() => navigate("/dashboard")}
            style={{ ...buttonStyle, background: "#6c757d", color: "white" }}
            onMouseOver={e => Object.assign(e.target.style, hoverEffect)}
            onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
          >
            Volver al Dashboard
          </button>
        </div>
      </div>

      {/* Grid de tarjetas de perfiles */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", 
        gap: "1.5rem"
      }}>
        {profiles.map((profile) => (
          <div
            key={profile.id}
            style={cardStyle}
            onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
            onMouseOut={e => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
              {profile.name || "Perfil sin nombre"}
            </h3>

            <div style={{ marginBottom: "1.5rem", color: "#4b5563" }}>
              <p style={{ margin: "0.5rem 0" }}>Edad: <strong>{profile.age || "?"} años</strong></p>
              <p style={{ margin: "0.5rem 0" }}>Género: <strong>{profile.gender || "No especificado"}</strong></p>
              <p style={{ margin: "0.5rem 0" }}>Educación: <strong>{profile.education || "No especificado"}</strong></p>
              {profile.createdAt && (
                <p style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: "1rem" }}>
                  Creado: {new Date(profile.createdAt).toLocaleDateString("es-CO")}
                </p>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() => navigate(`/edit/${profile.id}`)}
                style={{ ...buttonStyle, background: "#0066cc", color: "white" }}
                onMouseOver={e => Object.assign(e.target.style, hoverEffect)}
                onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
              >
                Editar
              </button>

              <button
                onClick={() => navigate(`/profile/${profile.id}`)}
                style={{ ...buttonStyle, background: "#3b82f6", color: "white" }}
                onMouseOver={e => Object.assign(e.target.style, hoverEffect)}
                onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
              >
                Ver Detalle
              </button>

              <button
                onClick={() => {
                  if (window.confirm("¿Realmente deseas eliminar este perfil?")) {
                    deleteProfile(profile.id);
                  }
                }}
                style={{ ...buttonStyle, background: "#dc3545", color: "white" }}
                onMouseOver={e => Object.assign(e.target.style, hoverEffect)}
                onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
