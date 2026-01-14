export default function Step1Basic({ data, setData }) {
  return (
    <div>
      <h3>Datos básicos</h3>

      <div className="form-group">
        <label>¿Cuál es tu nombre completo? *</label>
        <input
          type="text"
          placeholder="Tu nombre completo"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>¿Cuál es tu edad actual? *</label>
        <input
          type="number"
          min="18"
          max="100"
          placeholder="18–100"
          value={data.age}
          onChange={(e) => setData({ ...data, age: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>¿Con qué género te identificas? *</label>
        <select
          value={data.gender}
          onChange={(e) => setData({ ...data, gender: e.target.value })}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Prefiero no decirlo">Prefiero no decirlo</option>
        </select>
      </div>

      <div className="form-group">
        <label>¿En qué país resides actualmente?</label>
        <input 
          type="text" 
          value={data.country || "Colombia"} 
          disabled 
        />
      </div>
    </div>
  );
}