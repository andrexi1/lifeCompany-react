import { useState } from "react";
import { useProfiles } from "../context/ProfilesContext";

export default function CreateProfile() {
  const { addProfile } = useProfiles();
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addProfile({ age });
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo Perfil</h3>

      <input
        type="number"
        placeholder="Edad"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />

      <button type="submit">Guardar</button>
    </form>
  );
}
