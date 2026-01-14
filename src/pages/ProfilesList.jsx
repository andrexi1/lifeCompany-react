import { useProfiles } from "../context/ProfilesContext";

export default function ProfilesList() {
  const { profiles, deleteProfile } = useProfiles();

  if (profiles.length === 0) {
    return <p>No hay perfiles creados</p>;
  }

  return (
    <div>
      <h3>Perfiles</h3>

      {profiles.map((profile) => (
        <div key={profile.id}>
          <strong>Edad:</strong> {profile.age}{" "}
          <button onClick={() => deleteProfile(profile.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
