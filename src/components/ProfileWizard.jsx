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
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const totalSteps = steps.length;

    const validateCurrentStep = () => {
        const newErrors = {};
        const currentFields = getRequiredFieldsForStep(currentStep);

        currentFields.forEach((field) => {
            if (!formData[field] && formData[field] !== 0) {
                newErrors[field] = "Este campo es obligatorio";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getRequiredFieldsForStep = (step) => {
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

    const CurrentComponent = steps[currentStep - 1].component;

    const progressPercentage = (currentStep / totalSteps) * 100;

if (isCompleted) {
  return (
    <div style={{
      padding: "4rem 2rem",
      textAlign: "center",
      backgroundColor: "#f0f9ff",
      borderRadius: "12px",
      maxWidth: "600px",
      margin: "3rem auto",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ color: "#15803d", marginBottom: "1rem" }}>
        ¡{isEdit ? "Perfil actualizado" : "Perfil creado"} con éxito! 🎉
      </h2>
      
      <p style={{ fontSize: "1.1rem", marginBottom: "2.5rem", color: "#374151" }}>
        Los datos se han guardado correctamente.
      </p>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
        margin: "0 auto"
      }}>
        <button
          onClick={resetWizard}
          style={{
            padding: "14px 24px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "500",
            cursor: "pointer"
          }}
        >
          Crear {isEdit ? "otro" : "nuevo"} perfil
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "14px 24px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: "500",
            cursor: "pointer"
          }}
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
}
    return (
        <div className="profile-wizard">
            {/* Barra de progreso */}
            <div className="progress-container">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                <div className="progress-text">
                    Paso {currentStep} de {totalSteps} • {steps[currentStep - 1].title}
                </div>
            </div>

            {/* Contenido del paso actual */}
            <div className="step-content">
                <CurrentComponent data={formData} setData={setFormData} />

                {Object.keys(errors).length > 0 && (
                    <div className="error-box">
                        Por favor completa todos los campos obligatorios antes de continuar.
                    </div>
                )}
            </div>

            {/* Botones de navegación */}
            <div className="wizard-buttons">
                {currentStep > 1 && (
                    <button type="button" className="btn secondary" onClick={handleBack}>
                        Anterior
                    </button>
                )}

                <button
                    type="button"
                    className="btn primary"
                    onClick={handleNext}
                    style={{ marginLeft: "auto" }}
                >
                    {currentStep < totalSteps
                        ? "Siguiente"
                        : isEdit ? "Guardar Cambios" : "Finalizar y Crear Perfil"}
                </button>
            </div>
        </div>
    );
}