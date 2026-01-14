import { useState } from "react";

export default function CreateProfile() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    genero: "",
    nivelEstudio: "",
    pais: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Perfil guardado:", form);
    alert("Perfil guardado correctamente");
  };

  return (
    <div>
      <h3>Nuevo Perfil</h3>

      <form onSubmit={handleSubmit}>
        {/* PASO 1 */}
        {step === 1 && (
          <>
            <label>Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />

            <label>Edad</label>
            <input
              type="number"
              name="edad"
              value={form.edad}
              onChange={handleChange}
              required
            />
          </>
        )}

        {/* PASO 2 */}
        {step === 2 && (
          <>
            <label>Género</label>
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </>
        )}

        {/* PASO 3 */}
        {step === 3 && (
          <>
            <label>Nivel de estudio</label>
            <select
              name="nivelEstudio"
              value={form.nivelEstudio}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona</option>
              <option value="primaria">Primaria</option>
              <option value="secundaria">Secundaria</option>
              <option value="universitario">Universitario</option>
            </select>
          </>
        )}

        {/* PASO 4 */}
        {step === 4 && (
          <>
            <label>País</label>
            <input
              name="pais"
              value={form.pais}
              onChange={handleChange}
              required
            />
          </>
        )}

        <br />

        {/* BOTONES */}
        <div>
          {step > 1 && (
            <button type="button" onClick={back}>
              Atrás
            </button>
          )}

          {step < 4 && (
            <button type="button" onClick={next}>
              Siguiente
            </button>
          )}

          {step === 4 && <button type="submit">Guardar</button>}
        </div>
      </form>
    </div>
  );
}
