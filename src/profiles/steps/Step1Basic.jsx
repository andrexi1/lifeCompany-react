export default function Step1Basic({ data, setData }) {
  return (
    <div>
      <h3>Datos básicos</h3>

      <label>Nombre</label>
      <input
        type="text"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <label>Edad</label>
      <input
        type="number"
        min="18"
        max="100"
        value={data.age}
        onChange={(e) => setData({ ...data, age: e.target.value })}
      />

      <label>Género</label>
      <select
        value={data.gender}
        onChange={(e) => setData({ ...data, gender: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="No decir">Prefiero no decirlo</option>
      </select>

      <label>País</label>
      <input value={data.country} disabled />
    </div>
  );
}
