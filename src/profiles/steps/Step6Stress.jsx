export default function Step6Stress({ data, setData }) {
  return (
    <div>
      <h3>Estrés y bienestar</h3>

      <div className="form-group">
        <label>¿Cómo describirías tu nivel de estrés diario? *</label>
        <select
          value={data.stress}
          onChange={(e) => setData({ ...data, stress: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="Bajo">Bajo</option>
          <option value="Moderado">Moderado</option>
          <option value="Alto">Alto</option>
        </select>
      </div>

      <div className="form-group">
        <label>¿Sientes que tienes una buena red de apoyo (familia, amigos)? *</label>
        <select
          value={data.support}
          onChange={(e) => setData({ ...data, support: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="Si">Sí</option>
          <option value="Parcial">Parcialmente</option>
          <option value="No">No</option>
        </select>
      </div>
    </div>
  );
}