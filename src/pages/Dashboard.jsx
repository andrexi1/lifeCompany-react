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
    return <p style={{ padding: "2rem", textAlign: "center" }}>Cargando perfiles...</p>;
  }

  const containerStyle = {
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)",
    minHeight: "100vh",
    padding: "2rem",
    color: "#111"
  };

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    marginBottom: "1.5rem"
  };

  const buttonStyle = {
    fontSize: "1rem",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginRight: "1rem",
    marginTop: "0.5rem",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
  };

  const buttonHover = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  };

  return (
    <div style={containerStyle}>
      <div style={{ ...cardStyle, background: "linear-gradient(135deg, #0066cc, #3b82f6)", color: "white" }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <p>Bienvenido, {user?.email}</p>
        <p>Rol: {user?.role}</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
        <button
          style={{ ...buttonStyle, background: "#0066cc", color: "white" }}
          onMouseOver={e => Object.assign(e.currentTarget.style, buttonHover)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => navigate("/create-profile")}
        >
          Crear Nuevo Perfil
        </button>

        <button
          style={{ ...buttonStyle, background: "#10b981", color: "white" }}
          onMouseOver={e => Object.assign(e.currentTarget.style, buttonHover)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => navigate("/profiles")}
        >
          Ver Todos los Perfiles
        </button>

        <button
          style={{ ...buttonStyle, background: "#f59e0b", color: "white" }}
          onMouseOver={e => Object.assign(e.currentTarget.style, buttonHover)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => navigate("/statistics")}
        >
          Ver Estadísticas
        </button>

        <button
          style={{ ...buttonStyle, background: "#ef4444", color: "white", marginLeft: "auto" }}
          onMouseOver={e => Object.assign(e.currentTarget.style, buttonHover)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={logout}
        >
          Cerrar Sesión
        </button>
      </div>

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
                alignItems: "center"
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
                onMouseOver={e => Object.assign(e.currentTarget.style, buttonHover)}
                onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
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
