export default function Step3Activity({ data, setData }) {
  return (
    <div>
      <h3>Actividad física</h3>

      <div className="form-group">
        <label>¿Cuántos días a la semana realizas actividad física? *</label>
        <select
          value={data.activityDays}
          onChange={(e) => setData({ ...data, activityDays: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="0">0 días</option>
          <option value="1-2">1–2 días</option>
          <option value="3-4">3–4 días</option>
          <option value="5+">5 o más días</option>
        </select>
      </div>

      <div className="form-group">
        <label>¿Cuánto dura en promedio tu actividad física? *</label>
        <select
          value={data.activityDuration}
          onChange={(e) => setData({ ...data, activityDuration: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="<30">Menos de 30 minutos</option>
          <option value="30-60">30–60 minutos</option>
          <option value=">60">Más de 60 minutos</option>
        </select>
      </div>
    </div>
  );
}