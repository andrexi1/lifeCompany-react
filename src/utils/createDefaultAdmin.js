// src/utils/createDefaultAdmin.js
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function createDefaultAdmin() {
  const auth = getAuth();

  const email = "admin@empresa.com";
  const password = "Admin1234"; // cambia por la contraseña que quieras
  const role = "admin";

  try {
    // Crea el usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Crea el documento en Firestore
    await setDoc(doc(db, "users", uid), {
      email,
      role,
    });

    console.log("Admin creado con éxito:", email, uid);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.log("El admin ya existe. Verifica su documento en Firestore.");
    } else {
      console.error("Error creando admin:", error);
    }
  }
}
