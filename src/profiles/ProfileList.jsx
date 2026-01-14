import { useProfiles } from "../context/ProfilesContext";

export default function ProfilesList() {
  const { profiles, deleteProfile } = useProfiles();

  if (profiles.length === 0) {
    return <p>No hay perfiles creados.</p>;
  }

  return (
    <div>
      <h3>Perfiles guardados</h3>

      {profiles.map((p) => {
        console.log(p); // ← AQUÍ SÍ ES CORRECTO

        return (
          <div
            key={p.id}
            style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
          >
            <p><strong>{p.name}</strong></p>
            <p>Edad: {p.age}</p>
            <p>Género: {p.gender || "No especificado"}</p>
            <p>Educación: {p.education || "No especificado"}</p>

            <button onClick={() => deleteProfile(p.id)}>Eliminar</button>
          </div>
        );
      })}
    </div>
  );
}
