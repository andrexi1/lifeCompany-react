import { createContext, useContext, useState, useEffect } from "react";

const ProfilesContext = createContext();

const STORAGE_KEY = "health_profiles_app_v1"; // Cambia la versión si modificas la estructura

export function ProfilesProvider({ children }) {
  // Intentamos cargar los perfiles guardados al iniciar
  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error al cargar perfiles desde localStorage:", error);
      return [];
    }
  });

  // Guardamos automáticamente cada vez que profiles cambie
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    } catch (error) {
      console.error("Error al guardar perfiles en localStorage:", error);
    }
  }, [profiles]);

  const addProfile = (profile) => {
    // Nos aseguramos de que siempre tenga un id único
    const newProfile = {
      ...profile,
      id: profile.id || Date.now() + Math.random(), // doble seguridad
      createdAt: new Date().toISOString(),
    };

    console.log("Perfil agregado:", newProfile);
    setProfiles((prev) => [...prev, newProfile]);
  };

  const updateProfile = (updatedProfile) => {
    if (!updatedProfile.id) {
      console.error("No se puede actualizar perfil sin id");
      return;
    }

    setProfiles((prev) =>
      prev.map((p) => (p.id === updatedProfile.id ? { ...updatedProfile } : p))
    );

    console.log("Perfil actualizado:", updatedProfile);
  };

  const deleteProfile = (id) => {
    if (!id) return;

    setProfiles((prev) => {
      const newList = prev.filter((p) => p.id !== id);
      console.log(`Perfil ${id} eliminado. Quedan ${newList.length} perfiles`);
      return newList;
    });
  };

  const clearAllProfiles = () => {
    if (window.confirm("¿Realmente quieres ELIMINAR TODOS los perfiles?")) {
      setProfiles([]);
      console.warn("Todos los perfiles han sido eliminados");
    }
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        addProfile,
        updateProfile,
        deleteProfile,
        clearAllProfiles,     // útil para desarrollo/testing
        profileCount: profiles.length,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  const context = useContext(ProfilesContext);

  if (!context) {
    throw new Error("useProfiles debe usarse dentro de un ProfilesProvider");
  }

  return context;
}