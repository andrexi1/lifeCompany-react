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
    return (
      <div style={{ padding: "4rem", textAlign: "center", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana" }}>
        <h2>Cargando perfil...</h2>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div style={{
        padding: "4rem",
        textAlign: "center",
        background: "#f0f9ff",
        borderRadius: "12px",
        maxWidth: "600px",
        margin: "2rem auto",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana"
      }}>
        <h2 style={{ color: "#b91c1c" }}>Perfil no encontrado</h2>
        <p>El perfil que intentas editar no existe o fue eliminado.</p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "1.5rem",
            padding: "12px 28px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            transition: "all 0.2s ease"
          }}
          onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
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
        updatedAt: serverTimestamp(),
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
      minHeight: "100vh",
      background: "linear-gradient(135deg, #2563eb, #FFB88C)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana"
    }}>
      <div style={{
        background: "#ffffff",
        padding: "2.5rem",
        borderRadius: "16px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        maxWidth: "900px",
        margin: "0 auto"
      }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "#111827" }}>
          Editar Perfil: {profileData.name || "Sin nombre"}
        </h2>
        <p style={{ color: "#4b5563", marginBottom: "2rem", fontSize: "1.1rem" }}>
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
            onMouseOver={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
