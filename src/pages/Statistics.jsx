// src/pages/Statistics.jsx
import { useEffect, useState, useMemo } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { calculateLifeExpectancy } from "../utils/lifeExpectancyCalculator";
import { useNavigate } from "react-router-dom";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Statistics() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const profilesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfiles(profilesData);
      } catch (error) {
        console.error("Error cargando perfiles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const stats = useMemo(() => {
    if (!profiles || profiles.length === 0) return null;

    try {
      const ages = profiles.map((p) => Number(p.age) || 0);
      const avgAge = ages.reduce((a, b) => a + b, 0) / ages.length || 0;

      const lifeExpectancies = profiles
        .map((p) => {
          try {
            return calculateLifeExpectancy(p);
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      const avgLifeExp =
        lifeExpectancies.reduce((sum, le) => sum + (le?.estimatedYears || 0), 0) /
          (lifeExpectancies.length || 1) || 0;

      const genderCount = profiles.reduce((acc, p) => {
        const g = p.gender || "No especificado";
        acc[g] = (acc[g] || 0) + 1;
        return acc;
      }, {});

      const genderData = Object.entries(genderCount).map(([name, value]) => ({
        name,
        value,
      }));

      const smokingYes = profiles.filter(
        (p) => p.smoking === "Si" || p.smoking === "Ocasional"
      ).length;
      const smokingPercent = Math.round((smokingYes / profiles.length) * 100);

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
    } catch (error) {
      console.error("Error calculando estadísticas:", error);
      return null;
    }
  }, [profiles]);

  if (loading)
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>Cargando estadísticas...</h2>
      </div>
    );

  if (!stats)
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>No se pudieron generar las estadísticas</h2>
        <p>Verifica que tus perfiles tengan datos completos y correctos.</p>
      </div>
    );

  // --- Estilos ---
  const containerStyle = {
    padding: "3rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #f0f4ff, #d9e4ff)",
    minHeight: "100vh",
    borderRadius: "12px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "2.5rem",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
    textAlign: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const cardHover = {
    transform: "translateY(-4px)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
  };

  const titleStyle = {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "#111827",
    textAlign: "center",
  };

  const subtitleStyle = {
    color: "#555",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "1.1rem",
  };

  const buttonStyle = {
    padding: "14px 32px",
    borderRadius: "12px",
    border: "none",
    fontSize: "1.2rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: "#0066cc",
    color: "white",
    marginTop: "2rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  };

  const buttonHover = {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.2)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Estadísticas Generales</h1>
      <p style={subtitleStyle}>
        Basado en {stats.totalProfiles} perfiles registrados
      </p>

      {/* Estadísticas principales */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        {[
          { label: "Edad promedio", value: `${stats.avgAge} años` },
          { label: "Esperanza de vida promedio", value: `${stats.avgLifeExp} años` },
          { label: "Fuman (ocasional/si)", value: `${stats.smokingPercent}%` },
          { label: "Buena/Muy buena calidad de sueño", value: `${stats.goodSleepPercent}%` },
        ].map((stat, i) => (
          <div
            key={i}
            style={cardStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, cardHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
          >
            <h3 style={{ marginBottom: "1rem" }}>{stat.label}</h3>
            <p style={{ fontSize: "1.8rem", fontWeight: "600", color: "#333" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div style={cardStyle}>
          <h3 style={{ marginBottom: "1rem" }}>Distribución por Género</h3>
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

        <div style={cardStyle}>
          <h3 style={{ marginBottom: "1rem" }}>Esperanza de vida por perfil</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={profiles.map((p, i) => ({
                name: p.name?.substring(0, 15) || `Perfil ${i + 1}`,
                esperanza: (() => {
                  try {
                    return calculateLifeExpectancy(p)?.estimatedYears || 0;
                  } catch {
                    return 0;
                  }
                })(),
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

      {/* Botón volver */}
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          style={buttonStyle}
          onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHover)}
          onMouseOut={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
          onClick={() => navigate("/dashboard")}
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
}
