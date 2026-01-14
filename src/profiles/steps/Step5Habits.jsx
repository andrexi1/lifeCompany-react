export default function Step5Habits({ data, setData }) {
  return (
    <div>
      <h3>Hábitos generales</h3>

      <div className="form-group">
        <label>¿Con qué frecuencia consumes frutas y verduras? *</label>
        <select
          value={data.diet}
          onChange={(e) => setData({ ...data, diet: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="Nunca">Casi nunca</option>
          <option value="Algunas">Algunas veces a la semana</option>
          <option value="Casi diario">Casi todos los días</option>
          <option value="Diario">Todos los días</option>
        </select>
      </div>

      <div className="form-group">
        <label>¿Consumes alcohol? *</label>
        <select
          value={data.alcohol}
          onChange={(e) => setData({ ...data, alcohol: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="No">No consumo</option>
          <option value="Ocasional">Ocasionalmente</option>
          <option value="Frecuente">Frecuentemente</option>
        </select>
      </div>

      <div className="form-group">
        <label>¿Fumas actualmente? *</label>
        <select
          value={data.smoking}
          onChange={(e) => setData({ ...data, smoking: e.target.value })}
          required
        >
          <option value="">Selecciona</option>
          <option value="No">No</option>
          <option value="Ocasional">Ocasionalmente</option>
          <option value="Si">Sí</option>
        </select>
      </div>
    </div>
  );
}