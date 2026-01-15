// src/components/ProfileWizard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Step1Basic from "../profiles/steps/Step1Basic";
import Step2Education from "../profiles/steps/Step2Education";
import Step3Activity from "../profiles/steps/Step3Activity";
import Step4Sleep from "../profiles/steps/Step4Sleep";
import Step5Habits from "../profiles/steps/Step5Habits";
import Step6Stress from "../profiles/steps/Step6Stress";
import Step7Health from "../profiles/steps/Step7Health";

const steps = [
  { id: 1, title: "Datos básicos", component: Step1Basic },
  { id: 2, title: "Educación y trabajo", component: Step2Education },
  { id: 3, title: "Actividad física", component: Step3Activity },
  { id: 4, title: "Sueño y descanso", component: Step4Sleep },
  { id: 5, title: "Hábitos", component: Step5Habits },
  { id: 6, title: "Estrés y bienestar", component: Step6Stress },
  { id: 7, title: "Salud general", component: Step7Health },
];

const initialFormData = {
  name: "",
  age: "",
  gender: "",
  country: "Colombia",
  education: "",
  jobType: "",
  activityDays: "",
  activityDuration: "",
  sleepHours: "",
  sleepQuality: "",
  diet: "",
  alcohol: "",
  smoking: "",
  stress: "",
  support: "",
  chronicCondition: "",
  healthStatus: "",
};

export default function ProfileWizard({ onSubmit, initialData = null, isEdit = false }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialData || initialFormData);
  const [errors, setErrors] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const totalSteps = steps.length;
  const CurrentComponent = steps[currentStep - 1].component;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const validateCurrentStep = () => {
    const newErrors = {};
    const currentFields = getRequiredFieldsForStep(currentStep);
    currentFields.forEach(field => {
      if (!formData[field] && formData[field] !== 0) {
        newErrors[field] = "Este campo es obligatorio";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getRequiredFieldsForStep = step => {
    switch (step) {
      case 1: return ["name", "age", "gender"];
      case 2: return ["education", "jobType"];
      case 3: return ["activityDays", "activityDuration"];
      case 4: return ["sleepHours", "sleepQuality"];
      case 5: return ["diet", "alcohol", "smoking"];
      case 6: return ["stress", "support"];
      case 7: return ["chronicCondition", "healthStatus"];
      default: return [];
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setErrors({});
      } else {
        onSubmit({ ...formData });
        setIsCompleted(true);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setErrors({});
    setIsCompleted(false);
  };

  // --- Estilos ---
  const containerStyle = {
    maxWidth: "700px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#f0f4ff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const progressBarContainer = {
    backgroundColor: "#e5e7eb",
    borderRadius: "8px",
    overflow: "hidden",
    height: "12px",
    marginBottom: "0.5rem"
  };

  const progressBarFill = {
    width: `${progressPercentage}%`,
    background: "linear-gradient(90deg, #2563eb, #06b6d4)",
    height: "100%",
    transition: "width 0.3s ease"
  };

  const errorBoxStyle = {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "1rem",
    borderRadius: "8px",
    marginTop: "1rem",
    textAlign: "center"
  };

  const navButtonStyle = {
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const primaryButton = {
    ...navButtonStyle,
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
  };

  const secondaryButton = {
    ...navButtonStyle,
    backgroundColor: "#ffffff",
    color: "#2563eb",
    border: "1px solid #2563eb",
  };

  if (isCompleted) {
    return (
      <div style={{
        ...containerStyle,
        textAlign: "center"
      }}>
        <h2 style={{ color: "#15803d", marginBottom: "1rem" }}>
          ¡{isEdit ? "Perfil actualizado" : "Perfil creado"} con éxito! 🎉
        </h2>
        <p style={{ color: "#374151", fontSize: "1.1rem", marginBottom: "2.5rem" }}>
          Los datos se han guardado correctamente.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px", margin: "0 auto" }}>
          <button
            onClick={resetWizard}
            style={{ ...primaryButton, backgroundColor: "#16a34a" }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#15803d"}
            onMouseOut={e => e.currentTarget.style.backgroundColor = "#16a34a"}
          >
            Crear {isEdit ? "otro" : "nuevo"} perfil
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            style={primaryButton}
            onMouseOver={e => e.currentTarget.style.backgroundColor = "#1d4ed8"}
            onMouseOut={e => e.currentTarget.style.backgroundColor = "#2563eb"}
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Barra de progreso */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={progressBarContainer}>
          <div style={progressBarFill}></div>
        </div>
        <div style={{ textAlign: "right", fontSize: "0.9rem", color: "#374151" }}>
          Paso {currentStep} de {totalSteps} • {steps[currentStep - 1].title}
        </div>
      </div>

      {/* Contenido del paso */}
      <div>
        <CurrentComponent data={formData} setData={setFormData} />
        {Object.keys(errors).length > 0 && (
          <div style={errorBoxStyle}>
            Por favor completa todos los campos obligatorios antes de continuar.
          </div>
        )}
      </div>

      {/* Botones de navegación */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            style={secondaryButton}
            onMouseOver={e => { e.currentTarget.style.backgroundColor = "#2563eb"; e.currentTarget.style.color = "white"; }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.color = "#2563eb"; }}
          >
            Anterior
          </button>
        )}
        <button
          onClick={handleNext}
          style={primaryButton}
          onMouseOver={e => e.currentTarget.style.backgroundColor = "#1d4ed8"}
          onMouseOut={e => e.currentTarget.style.backgroundColor = "#2563eb"}
        >
          {currentStep < totalSteps ? "Siguiente" : isEdit ? "Guardar Cambios" : "Finalizar y Crear Perfil"}
        </button>
      </div>
    </div>
  );
}
