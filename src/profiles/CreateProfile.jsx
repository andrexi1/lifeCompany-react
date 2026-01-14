// src/profiles/CreateProfile.jsx
import { useProfiles } from "../context/ProfilesContext";
import ProfileWizard from "../components/ProfileWizard";

export default function CreateProfile() {
  const { addProfile } = useProfiles();

  const handleSubmit = (newProfileData) => {
    const profileWithId = {
      ...newProfileData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    addProfile(profileWithId);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Nuevo Perfil</h2>
      <ProfileWizard 
        onSubmit={handleSubmit}
      />
    </div>
  );
}