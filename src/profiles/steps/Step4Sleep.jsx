export default function Step4Sleep({ data, setData }) {
  return (
    <div>
      <h3>Sueño y descanso</h3>

      <div className="form-group">
        <label>¿Cuántas horas duermes en promedio por noche? *</label>
        <select
          value={data.sleepHours}
          onChange={(e) => setData({ ...data, sleepHours: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="<6">Menos de 6</option>
          <option value="6-7">6–7</option>
          <option value="7-8">7–8</option>
          <option value=">8">Más de 8</option>
        </select>
      </div>

      <div className="form-group">
        <label>¿Cómo calificarías la calidad de tu sueño? *</label>
        <select
          value={data.sleepQuality}
          onChange={(e) => setData({ ...data, sleepQuality: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="Mala">Mala</option>
          <option value="Regular">Regular</option>
          <option value="Buena">Buena</option>
          <option value="Muy buena">Muy buena</option>
        </select>
      </div>
    </div>
  );
}