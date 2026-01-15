// src/profiles/ProfileDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { calculateLifeExpectancy } from "../utils/lifeExpectancyCalculator";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProfileDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "profiles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error al cargar perfil desde Firebase:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>Cargando perfil...</h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", background: "#f8f9fa", borderRadius: "12px" }}>
        <h2>Perfil no encontrado</h2>
        <p>El perfil que buscas no existe o fue eliminado.</p>
        <button 
          onClick={() => navigate("/profiles")}
          style={{ marginTop: "1.5rem", padding: "12px 24px", background: "#0066cc", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  const expectancy = calculateLifeExpectancy(profile);

  const containerStyle = {
    padding: "2rem",
    maxWidth: "1100px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)",
    minHeight: "100vh"
  };

  const blockStyle = {
    background: "#ffffff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "default"
  };

  const buttonStyle = {
    padding: "12px 32px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginRight: "1rem"
  };

  const hoverEffect = {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#ffffff" }}>Detalle del Perfil: {profile.name || "Sin nombre"}</h1>
        <button 
          onClick={() => navigate("/profiles")}
          style={{ ...buttonStyle, background: "#6c757d", color: "white", marginRight: 0 }}
          onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
        >
          ← Volver a la lista
        </button>
      </div>

      {/* Esperanza de vida */}
      <div style={{
        background: expectancy?.estimatedYears > 75 ? "#d1fae5" : "#fee2e2",
        padding: "2rem",
        borderRadius: "12px",
        marginBottom: "2.5rem",
        textAlign: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ margin: "0 0 1rem", fontSize: "2.2rem" }}>Esperanza de vida estimada</h2>
        {expectancy ? (
          <>
            <div style={{ fontSize: "4.5rem", fontWeight: "bold", color: expectancy?.estimatedYears > 75 ? "#15803d" : "#dc2626" }}>
              {expectancy.estimatedYears} años
            </div>
            <p style={{ fontSize: "1.3rem", margin: "0.5rem 0" }}>
              Años restantes aproximados: <strong>{expectancy.remainingYears}</strong>
            </p>
            <p style={{ fontSize: "0.95rem", color: "#4b5563" }}>
              (Cálculo basado en factores de salud y hábitos)
            </p>
          </>
        ) : (
          <p style={{ fontSize: "1.2rem", color: "#dc2626" }}>No se pudo calcular la esperanza de vida</p>
        )}
      </div>

      {/* Bloques de datos */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "2rem" }}>
        {[
          { title: "Datos básicos", items: [
            { label: "Edad", value: profile.age + " años" },
            { label: "Género", value: profile.gender || "No especificado" },
            { label: "País", value: profile.country || "Colombia" }
          ]},
          { title: "Educación y trabajo", items: [
            { label: "Educación", value: profile.education || "No especificado" },
            { label: "Tipo de trabajo", value: profile.jobType || "No especificado" }
          ]},
          { title: "Actividad física", items: [
            { label: "Días por semana", value: profile.activityDays || "No especificado" },
            { label: "Duración promedio", value: profile.activityDuration || "No especificado" }
          ]},
          { title: "Sueño y descanso", items: [
            { label: "Horas por noche", value: profile.sleepHours || "No especificado" },
            { label: "Calidad del sueño", value: profile.sleepQuality || "No especificado" }
          ]},
          { title: "Hábitos generales", items: [
            { label: "Frutas y verduras", value: profile.diet || "No especificado" },
            { label: "Alcohol", value: profile.alcohol || "No especificado" },
            { label: "Fuma", value: profile.smoking || "No especificado" }
          ]},
          { title: "Estrés y bienestar", items: [
            { label: "Nivel de estrés", value: profile.stress || "No especificado" },
            { label: "Red de apoyo", value: profile.support || "No especificado" }
          ]},
          { title: "Salud general", items: [
            { label: "Condición crónica", value: profile.chronicCondition || "No especificado" },
            { label: "Estado de salud", value: profile.healthStatus || "No especificado" }
          ]}
        ].map((section, idx) => (
          <div key={idx} style={blockStyle} onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)} onMouseOut={e => Object.assign(e.currentTarget.style, blockStyle)}>
            <h3>{section.title}</h3>
            {section.items.map((item, i) => (
              <p key={i}><strong>{item.label}:</strong> {item.value}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Botones finales */}
      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <button 
          onClick={() => navigate(`/edit/${profile.id}`)}
          style={{ ...buttonStyle, background: "#0066cc", color: "white" }}
          onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
        >
          Editar este perfil
        </button>
        <button 
          onClick={() => navigate("/profiles")}
          style={{ ...buttonStyle, background: "#6c757d", color: "white", marginRight: 0 }}
          onMouseOver={e => Object.assign(e.currentTarget.style, hoverEffect)}
          onMouseOut={e => Object.assign(e.currentTarget.style, buttonStyle)}
        >
          Volver a la lista
        </button>
      </div>
    </div>
  );
}
