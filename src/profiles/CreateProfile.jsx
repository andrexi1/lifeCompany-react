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

      // Perfil guardado, no redirecciona automáticamente
      console.log("Perfil creado con éxito:", newProfileData);
    } catch (error) {
      console.error("Error creando perfil:", error);
      alert("No se pudo crear el perfil");
    }
  };

  // --- Estilos ---
  const containerStyle = {
    padding: "3rem",
    maxWidth: "1000px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)",
    minHeight: "100vh",
    borderRadius: "12px",
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "3rem",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)", // sombra más marcada
    marginBottom: "2rem",
  };

  const titleStyle = {
    marginBottom: "2rem",
    fontSize: "2.8rem", // título más grande
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "16px 36px", // botón más grande
    borderRadius: "12px",
    border: "none",
    fontSize: "1.3rem", // letra más grande
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: "#0066cc",
    color: "white",
    marginTop: "2rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)", // sombra en botón
  };

  const buttonHover = {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.25)",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Crear Nuevo Perfil</h2>

        <ProfileWizard onSubmit={handleSubmit} />

        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            style={buttonStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
            onClick={() => navigate("/profiles")}
          >
            Volver a la lista de perfiles
          </button>
        </div>
      </div>
    </div>
  );
}
