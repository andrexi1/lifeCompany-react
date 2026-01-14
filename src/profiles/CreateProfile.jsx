import { useState } from "react";
import { useProfiles } from "../context/ProfilesContext";

export default function CreateProfile() {
  const { addProfile } = useProfiles();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProfile = {
      id: Date.now(),
      name,
      age: Number(age),
      gender,
      education,
    };

    console.log("Enviando perfil:", newProfile);

    addProfile(newProfile);

    setName("");
    setAge("");
    setGender("");
    setEducation("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo perfil</h3>

      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Edad"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Prefiero no decirlo">Prefiero no decirlo</option>
      </select>

      <select
        value={education}
        onChange={(e) => setEducation(e.target.value)}
      >
        <option value="">Nivel educativo</option>
        <option value="Primaria">Primaria</option>
        <option value="Secundaria">Secundaria</option>
        <option value="Universitario">Universitario</option>
        <option value="Posgrado">Posgrado</option>
      </select>

      <button type="submit">Crear perfil</button>
    </form>
  );
}
