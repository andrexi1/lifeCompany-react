export default function Step7Health({ data, setData }) {
  return (
    <div>
      <h3>Salud general</h3>

      <div className="form-group">
        <label>¿Tienes alguna condición crónica diagnosticada?</label>
        <select
          value={data.chronicCondition}
          onChange={(e) => setData({ ...data, chronicCondition: e.target.value })}
        >
          <option value="">Selecciona (opcional)</option>
          <option value="No">No</option>
          <option value="Si">Sí</option>
        </select>
      </div>

      <div className="form-group">
        <label>¿Cómo describirías tu estado de salud general? *</label>
        <select
          value={data.healthStatus}
          onChange={(e) => setData({ ...data, healthStatus: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="Malo">Malo</option>
          <option value="Regular">Regular</option>
          <option value="Bueno">Bueno</option>
          <option value="Muy bueno">Muy bueno</option>
        </select>
      </div>
    </div>
  );
}