// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const profilesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfiles(profilesData);
      } catch (error) {
        console.error("Error al cargar perfiles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  if (loading) {
    return <p style={{ padding: "4rem", textAlign: "center", fontSize: "1.2rem" }}>Cargando perfiles...</p>;
  }

  // --- Estilos ---
  const containerStyle = {
    padding: "3rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #2563eb, #FFB88C)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    background: "rgb(34, 143, 168)",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "1.8rem",
    marginBottom: "2rem",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const cardHover = {
    transform: "translateY(-4px)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
  };

  const buttonStyle = {
    fontSize: "1rem",
    padding: "12px 28px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    marginRight: "1rem",
    marginTop: "0.5rem",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const buttonHover = {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div
        style={{ 
          ...cardStyle, 
          background: "linear-gradient(135deg, #2563eb, #3b82f6)", 
          color: "white", 
          textAlign: "center" 
        }}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHover)}
        onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
      >
        <h1 style={{ margin: 0, fontSize: "2rem" }}>Dashboard</h1>
        <p>Bienvenido, {user?.email}</p>
        <p>Rol: {user?.role}</p>
      </div>

      {/* Botones principales */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
        <button
          style={{ ...buttonStyle, background: "#2563eb", color: "white" }}
          onMouseOver={e => Object.assign(e.currentTarget.style, { ...buttonHover, background: "#1d4ed8" })}
          onMouseOut={e => Object.assign(e.currentTarget.style, { ...buttonStyle, background: "#2563eb", color: "white" })}
          onClick={() => navigate("/create-profile")}
        >
          Crear Nuevo Perfil
        </button>

        <button
          style={{ ...buttonStyle, background: "#10b981", color: "white" }}
          onMouseOver={e => Object.assign(e.currentTarget.style, { ...buttonHover, background: "#059669" })}
          onMouseOut={e => Object.assign(e.currentTarget.style, { ...buttonStyle, background: "#10b981", color: "white" })}
          onClick={() => navigate("/profiles")}
        >
          Ver Todos los Perfiles
        </button>

        <button
          style={{ ...buttonStyle, background: "#f59e0b", color: "white" }}
          onMouseOver={e => Object.assign(e.currentTarget.style, { ...buttonHover, background: "#d97706" })}
          onMouseOut={e => Object.assign(e.currentTarget.style, { ...buttonStyle, background: "#f59e0b", color: "white" })}
          onClick={() => navigate("/statistics")}
        >
          Ver Estadísticas
        </button>

        <button
          style={{ ...buttonStyle, background: "#ef4444", color: "white", marginLeft: "auto" }}
          onMouseOver={e => Object.assign(e.currentTarget.style, { ...buttonHover, background: "#dc2626" })}
          onMouseOut={e => Object.assign(e.currentTarget.style, { ...buttonStyle, background: "#ef4444", color: "white" })}
          onClick={logout}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Perfiles recientes */}
      <div style={{ ...cardStyle, marginTop: "2rem" }}>
        <h2>Perfiles Recientes</h2>
        {profiles.length === 0 ? (
          <p>No hay perfiles creados todavía.</p>
        ) : (
          profiles.slice(-5).reverse().map(profile => (
            <div
              key={profile.id}
              style={{
                padding: "0.8rem 1rem",
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background 0.2s",
              }}
            >
              <span>
                <strong>{profile.name}</strong> - Edad: {profile.age}
              </span>
              <button
                style={{
                  ...buttonStyle,
                  padding: "6px 12px",
                  fontSize: "0.9rem",
                  background: "#3b82f6",
                  color: "white"
                }}
                onClick={() => navigate(`/profiles/${profile.id}`)}
                onMouseOver={e => Object.assign(e.currentTarget.style, { ...buttonHover, background: "#2563eb" })}
                onMouseOut={e => Object.assign(e.currentTarget.style, { ...buttonStyle, background: "#3b82f6", color: "white" })}
              >
                Ver Detalles
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
