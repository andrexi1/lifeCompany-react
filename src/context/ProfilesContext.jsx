import { createContext, useContext, useState } from "react";

const ProfilesContext = createContext();

export function ProfilesProvider({ children }) {
  const [profiles, setProfiles] = useState([]);

  const addProfile = (profile) => {
    console.log("Perfil recibido:", JSON.stringify(profile, null, 2));


    setProfiles((prev) => [...prev, profile]);
  };

  const deleteProfile = (id) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        addProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  return useContext(ProfilesContext);
}
