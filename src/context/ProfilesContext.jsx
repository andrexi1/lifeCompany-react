import { createContext, useContext, useState } from "react";

const ProfilesContext = createContext();

export function ProfilesProvider({ children }) {
  const [profiles, setProfiles] = useState([]);

  const addProfile = (profile) => {
    setProfiles((prev) => [...prev, { id: Date.now(), ...profile }]);
  };

  const updateProfile = (id, updatedProfile) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProfile } : p))
    );
  };

  const deleteProfile = (id) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProfilesContext.Provider
      value={{ profiles, addProfile, updateProfile, deleteProfile }}
    >
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  return useContext(ProfilesContext);
}
