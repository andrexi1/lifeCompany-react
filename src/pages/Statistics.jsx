// src/pages/Statistics.jsx
import { useProfiles } from "../context/ProfilesContext";
import { calculateLifeExpectancy } from "../utils/lifeExpectancyCalculator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useMemo } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Statistics() {
  const { profiles } = useProfiles();

  // Si no hay perfiles, mostrar mensaje
  if (profiles.length === 0) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h2>Estadísticas generales</h2>
        <p>Aún no hay suficientes perfiles para mostrar estadísticas.</p>
        <p>Crea algunos perfiles para ver los resultados aquí.</p>
      </div>
    );
  }

  // Cálculos con useMemo para optimizar
  const stats = useMemo(() => {
    const ages = profiles.map((p) => Number(p.age) || 0);
    const avgAge = ages.reduce((a, b) => a + b, 0) / ages.length || 0;

    const lifeExpectancies = profiles
      .map(calculateLifeExpectancy)
      .filter(Boolean);

    const avgLifeExp = lifeExpectancies.reduce(
      (sum, le) => sum + (le?.estimatedYears || 0),
      0
    ) / lifeExpectancies.length || 0;

    // Distribución por género
    const genderCount = profiles.reduce((acc, p) => {
      const g = p.gender || "No especificado";
      acc[g] = (acc[g] || 0) + 1;
      return acc;
    }, {});

    const genderData = Object.entries(genderCount).map(([name, value]) => ({
      name,
      value,
    }));

    // Ejemplo: % que fuma "Sí" o "Ocasionalmente"
    const smokingYes = profiles.filter(
      (p) => p.smoking === "Si" || p.smoking === "Ocasional"
    ).length;
    const smokingPercent = Math.round((smokingYes / profiles.length) * 100);

    // % con sueño bueno/muy bueno
    const goodSleep = profiles.filter(
      (p) => p.sleepQuality === "Buena" || p.sleepQuality === "Muy buena"
    ).length;
    const goodSleepPercent = Math.round((goodSleep / profiles.length) * 100);

    return {
      totalProfiles: profiles.length,
      avgAge: avgAge.toFixed(1),
      avgLifeExp: avgLifeExp.toFixed(1),
      genderData,
      smokingPercent,
      goodSleepPercent,
    };
  }, [profiles]);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Estadísticas Generales</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        Basado en {stats.totalProfiles} perfiles registrados
      </p>

      {/* Tarjetas de resumen */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <div className="stat-card">
          <h3>Edad promedio</h3>
          <p className="stat-value">{stats.avgAge} años</p>
        </div>

        <div className="stat-card">
          <h3>Esperanza de vida estimada promedio</h3>
          <p className="stat-value">{stats.avgLifeExp} años</p>
        </div>

        <div className="stat-card">
          <h3>Fuman (o fumaron ocasionalmente)</h3>
          <p className="stat-value">{stats.smokingPercent}%</p>
        </div>

        <div className="stat-card">
          <h3>Buena/Muy buena calidad de sueño</h3>
          <p className="stat-value">{stats.goodSleepPercent}%</p>
        </div>
      </div>

      {/* Gráficas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Distribución por género */}
        <div>
          <h3>Distribución por Género</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {stats.genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Esperanza de vida individual (barras) */}
        <div>
          <h3>Esperanza de vida estimada por perfil</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={profiles.map((p, i) => ({
                name: p.name?.substring(0, 15) || `Perfil ${i + 1}`,
                esperanza: calculateLifeExpectancy(p)?.estimatedYears || 0,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="esperanza" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}