import { createContext, useContext, useState, useEffect } from "react";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // <- tu archivo de configuración de Firebase

const ProfilesContext = createContext();

export function ProfilesProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const profilesCollection = collection(db, "profiles");

  // Escuchar cambios en tiempo real
  useEffect(() => {
    const q = query(profilesCollection, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const profilesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProfiles(profilesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Agregar perfil
  const addProfile = async (profile) => {
    try {
      await addDoc(profilesCollection, {
        ...profile,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error agregando perfil:", error);
    }
  };

  // Actualizar perfil
  const updateProfile = async (profile) => {
    if (!profile.id) return;
    try {
      const docRef = doc(db, "profiles", profile.id);
      await updateDoc(docRef, {
        ...profile,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error actualizando perfil:", error);
    }
  };

  // Eliminar perfil
  const deleteProfile = async (id) => {
    if (!id) return;
    try {
      const docRef = doc(db, "profiles", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error eliminando perfil:", error);
    }
  };

  return (
    <ProfilesContext.Provider
      value={{
        profiles,
        loading,
        addProfile,
        updateProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles() {
  const context = useContext(ProfilesContext);
  if (!context) throw new Error("useProfiles debe usarse dentro de un ProfilesProvider");
  return context;
}
