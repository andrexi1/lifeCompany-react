export default function Step7Health({ data, setData }) {
  return (
    <div>
      <h3>Salud general</h3>

      <label>Condición crónica</label>
      <select
        value={data.chronicCondition}
        onChange={(e) =>
          setData({ ...data, chronicCondition: e.target.value })
        }
      >
        <option value="">Seleccione</option>
        <option value="No">No</option>
        <option value="Si">Sí</option>
      </select>

      <label>Estado de salud</label>
      <select
        value={data.healthStatus}
        onChange={(e) => setData({ ...data, healthStatus: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="Malo">Malo</option>
        <option value="Regular">Regular</option>
        <option value="Bueno">Bueno</option>
        <option value="Muy bueno">Muy bueno</option>
      </select>
    </div>
  );
}
