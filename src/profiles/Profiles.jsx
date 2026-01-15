// src/pages/Profiles.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Profiles() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfiles(data);
      } catch (error) {
        console.error("Error al cargar perfiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const containerStyle = {
    minHeight: "100vh",
    padding: "2rem",
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)",
  };

  const cardStyle = {
    background: "white",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    marginBottom: "1.5rem",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginRight: "1rem",
    background: "#0066cc",
    color: "white",
    fontWeight: "500",
    transition: "all 0.2s ease",
  };

  const hoverEffect = {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "3rem" }}>Cargando perfiles...</p>;

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 style={{ color: "white" }}>Perfiles</h2>
        {user?.role === "user" && (
          <button
            style={buttonStyle}
            onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
            onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
            onClick={() => navigate("/create-profile")}
          >
            Crear Perfil
          </button>
        )}
      </div>

      {profiles.length === 0 ? (
        <p style={{ color: "white" }}>No hay perfiles creados aún.</p>
      ) : (
        profiles.map((profile) => (
          <div key={profile.id} style={cardStyle}>
            <p><strong>Nombre:</strong> {profile.name}</p>
            <p><strong>Edad:</strong> {profile.age}</p>
            <p><strong>Rol:</strong> {profile.role || "N/A"}</p>

            <div style={{ marginTop: "1rem" }}>
              {user?.role === "user" && (
                <button
                  style={buttonStyle}
                  onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
                  onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
                  onClick={() => navigate(`/edit-profile/${profile.id}`)}
                >
                  Editar
                </button>
              )}
            </div>
          </div>
        ))
      )}

      <button
        style={{ ...buttonStyle, marginTop: "2rem", background: "#6c757d" }}
        onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
        onMouseOut={e => Object.assign(e.currentTarget.style, { ...buttonStyle, background: "#6c757d" })}
        onClick={() => navigate(user?.role === "admin" ? "/admin" : "/dashboard")}
      >
        Volver
      </button>
    </div>
  );
}
