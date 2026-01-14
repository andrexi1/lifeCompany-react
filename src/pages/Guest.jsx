import { useProfiles } from "../context/ProfilesContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

export default function Guest() {
  const { profiles } = useProfiles();
  const navigate = useNavigate();

  if (profiles.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Modo Invitado</h2>
        <p>No hay perfiles creados todavía para mostrar estadísticas.</p>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1.5rem",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#0066cc",
            color: "white",
            cursor: "pointer"
          }}
        >
          Volver
        </button>
      </div>
    );
  }

  const avgAge = profiles.reduce((sum, p) => sum + (p.age || 0), 0) / profiles.length;
  const avgSleep = profiles.reduce((sum, p) => sum + (p.sleepHours || 0), 0) / profiles.length;
  const avgActivity = profiles.reduce((sum, p) => sum + (p.activityDays || 0), 0) / profiles.length;

  const data = [
    { name: "Edad promedio", value: parseFloat(avgAge.toFixed(1)) },
    { name: "Horas de sueño", value: parseFloat(avgSleep.toFixed(1)) },
    { name: "Días de actividad", value: parseFloat(avgActivity.toFixed(1)) },
  ];

  return (
    <div style={{ padding: "2rem", background: "#F96E5B", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "white" }}>Modo Invitado</h2>

      <div style={{ marginTop: "2rem", maxWidth: "700px", marginLeft: "auto", marginRight: "auto", background: "#ffffff", padding: "2rem", borderRadius: "12px", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" }}>
        <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Estadísticas Generales</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            {/* Aquí fijamos el dominio para que se vea la escala correcta */}
            <YAxis domain={[0, 'dataMax + 5']} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Botón volver */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#0066cc",
            color: "white",
            cursor: "pointer"
          }}
        >
          Volver
        </button>
      </div>
    </div>
  );
}
