export default function Step5Habits({ data, setData }) {
  return (
    <div>
      <h3>Hábitos</h3>

      <label>Frutas y verduras</label>
      <select
        value={data.diet}
        onChange={(e) => setData({ ...data, diet: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="Nunca">Casi nunca</option>
        <option value="Algunas">Algunas veces</option>
        <option value="Casi diario">Casi todos los días</option>
        <option value="Diario">Todos los días</option>
      </select>

      <label>Alcohol</label>
      <select
        value={data.alcohol}
        onChange={(e) => setData({ ...data, alcohol: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="No">No consumo</option>
        <option value="Ocasional">Ocasionalmente</option>
        <option value="Frecuente">Frecuentemente</option>
      </select>

      <label>Fuma</label>
      <select
        value={data.smoking}
        onChange={(e) => setData({ ...data, smoking: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="No">No</option>
        <option value="Ocasional">Ocasionalmente</option>
        <option value="Si">Sí</option>
      </select>
    </div>
  );
}
