import { useParams, useNavigate } from "react-router-dom";
import { useProfiles } from "../context/ProfilesContext";
import ProfileWizard from "../components/ProfileWizard";

export default function EditProfile() {
  const { id } = useParams(); // obtiene el id de la URL (/edit/12345)
  const { profiles, updateProfile } = useProfiles();
  const navigate = useNavigate();

  // Buscamos el perfil por id
  const profileToEdit = profiles.find((p) => p.id === Number(id));

  if (!profileToEdit) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Perfil no encontrado</h2>
        <p>El perfil que intentas editar no existe o fue eliminado.</p>
        <button 
          onClick={() => navigate("/dashboard")}
          style={{ padding: "10px 20px", marginTop: "1rem" }}
        >
          Volver al Dashboard
        </button>
      </div>
    );
  }

  const handleSubmit = (updatedData) => {
    // Combinamos los datos existentes con los nuevos (por si algo no se tocó)
    updateProfile({
      ...profileToEdit,
      ...updatedData,
      updatedAt: new Date().toISOString(), // opcional: fecha de última actualización
    });
    
    alert("¡Perfil actualizado con éxito!");
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Editar Perfil: {profileToEdit.name || "Sin nombre"}</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Modifica la información y guarda los cambios
      </p>

      <ProfileWizard
        initialData={profileToEdit}
        onSubmit={handleSubmit}
        isEdit={true}
      />
    </div>
  );
}