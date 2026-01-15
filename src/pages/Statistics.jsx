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

  if (loading) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>Cargando estadísticas...</h2>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>No se pudieron generar las estadísticas</h2>
        <p>Verifica que tus perfiles tengan datos completos y correctos.</p>
      </div>
    );
  }

  // --- Estilos ---
  const containerStyle = {
    padding: "3rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "linear-gradient(135deg, #F96E5B, #FFB88C)",
    minHeight: "100vh",
    borderRadius: "12px",
  };

  const cardStyle = {
    background: "#ffffff",
    padding: "2.5rem",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    marginBottom: "2rem",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "#111827",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "16px 36px",
    borderRadius: "12px",
    border: "none",
    fontSize: "1.3rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: "#0066cc",
    color: "white",
    marginTop: "2rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  };

  const buttonHover = {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.25)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Estadísticas Generales</h1>
      <p style={{ color: "#666", textAlign: "center", marginBottom: "2rem" }}>
        Basado en {stats.totalProfiles} perfiles registrados
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <div style={cardStyle}>
          <h3>Edad promedio</h3>
          <p style={{ fontSize: "1.8rem", fontWeight: "600" }}>{stats.avgAge} años</p>
        </div>

        <div style={cardStyle}>
          <h3>Esperanza de vida promedio</h3>
          <p style={{ fontSize: "1.8rem", fontWeight: "600" }}>{stats.avgLifeExp} años</p>
        </div>

        <div style={cardStyle}>
          <h3>Fuman (o fumaron ocasionalmente)</h3>
          <p style={{ fontSize: "1.8rem", fontWeight: "600" }}>{stats.smokingPercent}%</p>
        </div>

        <div style={cardStyle}>
          <h3>Buena/Muy buena calidad de sueño</h3>
          <p style={{ fontSize: "1.8rem", fontWeight: "600" }}>{stats.goodSleepPercent}%</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div style={cardStyle}>
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

        <div style={cardStyle}>
          <h3>Esperanza de vida por perfil</h3>
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

      {/* Botón para volver al dashboard */}
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
