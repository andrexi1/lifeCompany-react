export default function Step6Stress({ data, setData }) {
  return (
    <div>
      <h3>Estrés y bienestar</h3>

      <label>Nivel de estrés</label>
      <select
        value={data.stress}
        onChange={(e) => setData({ ...data, stress: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="Bajo">Bajo</option>
        <option value="Moderado">Moderado</option>
        <option value="Alto">Alto</option>
      </select>

      <label>Red de apoyo</label>
      <select
        value={data.support}
        onChange={(e) => setData({ ...data, support: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="Si">Sí</option>
        <option value="Parcial">Parcialmente</option>
        <option value="No">No</option>
      </select>
    </div>
  );
}
