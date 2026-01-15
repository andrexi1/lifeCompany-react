// src/profiles/EditProfile.jsx
import { useParams, useNavigate } from "react-router-dom";
import ProfileWizard from "../components/ProfileWizard";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar perfil desde Firebase
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "profiles", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfileData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProfileData(null);
        }
      } catch (error) {
        console.error("Error cargando perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "2rem", textAlign: "center" }}>Cargando perfil...</p>;
  }

  if (!profileData) {
    return (
      <div style={{
        padding: "4rem",
        textAlign: "center",
        background: "#f8f9fa",
        borderRadius: "12px",
        maxWidth: "600px",
        margin: "2rem auto",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
      }}>
        <h2>Perfil no encontrado</h2>
        <p>El perfil que intentas editar no existe o fue eliminado.</p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "1.5rem",
            padding: "12px 24px",
            background: "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          Volver al Dashboard
        </button>
      </div>
    );
  }

  const handleSubmit = async (updatedData) => {
    try {
      const docRef = doc(db, "profiles", id);
      await updateDoc(docRef, {
        ...updatedData,
        updatedAt: serverTimestamp(), // registra fecha de actualización
      });

      alert("¡Perfil actualizado con éxito!");
      navigate("/profiles");
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      alert("No se pudo actualizar el perfil");
    }
  };

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "900px",
      margin: "0 auto",
      background: "linear-gradient(135deg, #F96E5B, #FFB88C)",
      minHeight: "100vh",
      borderRadius: "12px"
    }}>
      <div style={{
        background: "#ffffff",
        padding: "2.5rem",
        borderRadius: "16px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.15)"
      }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Editar Perfil: {profileData.name || "Sin nombre"}
        </h2>
        <p style={{ color: "#666", marginBottom: "2rem", fontSize: "1.1rem" }}>
          Modifica la información y guarda los cambios
        </p>

        <ProfileWizard
          initialData={profileData}
          onSubmit={handleSubmit}
          isEdit={true}
        />

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "14px 36px",
              borderRadius: "12px",
              border: "none",
              fontSize: "1.2rem",
              fontWeight: "600",
              cursor: "pointer",
              background: "#6c757d",
              color: "white",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
