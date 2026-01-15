// src/profiles/CreateProfile.jsx
import { useNavigate } from "react-router-dom";
import ProfileWizard from "../components/ProfileWizard";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateProfile() {
  const navigate = useNavigate();

  const handleSubmit = async (newProfileData) => {
    try {
      await addDoc(collection(db, "profiles"), {
        ...newProfileData,
        createdAt: serverTimestamp(),
      });
      alert("Perfil creado con éxito");
      navigate("/profiles"); // redirige al listado de perfiles automáticamente
    } catch (error) {
      console.error("Error creando perfil:", error);
      alert("No se pudo crear el perfil");
    }
  };

  // --- Estilos ---
  const containerStyle = {
    minHeight: "100vh",
    padding: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    background: "#fff",
    padding: "3rem",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.3s ease",
  };

  const titleStyle = {
    fontSize: "2.8rem",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "2rem",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "16px 36px",
    borderRadius: "12px",
    border: "none",
    fontSize: "1.3rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: "#0066cc",
    color: "#fff",
    marginTop: "2rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  };

  const buttonHover = {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.25)",
  };

  const backButtonStyle = {
    ...buttonStyle,
    background: "#6c757d",
    marginTop: "1.5rem",
  };

  const wizardContainerStyle = {
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Crear Nuevo Perfil</h2>

        {/* Formulario de Wizard */}
        <div style={wizardContainerStyle}>
          <ProfileWizard onSubmit={handleSubmit} />
        </div>

        {/* Botón para volver */}
        <button
          type="button"
          style={backButtonStyle}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHover)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, backButtonStyle)}
          onClick={() => navigate("/profiles")}
        >
          Volver a la lista de perfiles
        </button>
      </div>
    </div>
  );
}
