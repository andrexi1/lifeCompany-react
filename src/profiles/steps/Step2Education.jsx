export default function Step2Education({ data, setData }) {
  return (
    <div>
      <h3>Educación y trabajo</h3>

      <label>Nivel de estudios</label>
      <select
        value={data.education}
        onChange={(e) => setData({ ...data, education: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="Sin estudios">Sin estudios</option>
        <option value="Primaria">Primaria</option>
        <option value="Secundaria">Secundaria</option>
        <option value="Tecnico">Técnico / Tecnólogo</option>
        <option value="Universitario">Universitario</option>
        <option value="Posgrado">Posgrado</option>
      </select>

      <label>Tipo de trabajo</label>
      <select
        value={data.jobType}
        onChange={(e) => setData({ ...data, jobType: e.target.value })}
      >
        <option value="">Seleccione</option>
        <option value="Sedentario">Sedentario</option>
        <option value="Mixto">Mixto</option>
        <option value="Fisico">Físico</option>
      </select>
    </div>
  );
}
