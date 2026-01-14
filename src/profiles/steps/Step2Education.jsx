export default function Step2Education({ data, setData }) {
  return (
    <div>
      <h3>Educación y trabajo</h3>

      <div className="form-group">
        <label>¿Cuál es tu nivel máximo de estudios alcanzado? *</label>
        <select
          value={data.education}
          onChange={(e) => setData({ ...data, education: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="Sin estudios formales">Sin estudios formales</option>
          <option value="Primaria">Primaria</option>
          <option value="Secundaria">Secundaria</option>
          <option value="Técnico / Tecnólogo">Técnico / Tecnólogo</option>
          <option value="Universitario">Universitario</option>
          <option value="Posgrado">Posgrado</option>
        </select>
      </div>

      <div className="form-group">
        <label>¿Cómo describirías principalmente tu trabajo o actividad diaria? *</label>
        <select
          value={data.jobType}
          onChange={(e) => setData({ ...data, jobType: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="Sedentario">Sedentario (oficina, computador)</option>
          <option value="Mixto">Mixto (algo de movimiento)</option>
          <option value="Físico">Físico (movimiento constante)</option>
        </select>
      </div>
    </div>
  );
}