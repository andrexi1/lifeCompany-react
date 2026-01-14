export default function Step3Activity({ data, setData }) {
  return (
    <div>
      <h3>Actividad física</h3>

      <label>Días por semana</label>
      <select
        value={data.activityDays}
        onChange={(e) => setData({ ...data, activityDays: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="0">0 días</option>
        <option value="1-2">1–2 días</option>
        <option value="3-4">3–4 días</option>
        <option value="5+">5 o más días</option>
      </select>

      <label>Duración</label>
      <select
        value={data.activityDuration}
        onChange={(e) => setData({ ...data, activityDuration: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="<30">Menos de 30 min</option>
        <option value="30-60">30–60 min</option>
        <option value=">60">Más de 60 min</option>
      </select>
    </div>
  );
}
