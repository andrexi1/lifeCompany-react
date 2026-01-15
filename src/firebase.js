// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCYIXq8vt66zZOE7KQIMFOMzBGvbRP8OU0", // revisa que esta sea la correcta
  authDomain: "life-company-app.firebaseapp.com",
  projectId: "life-company-app",
  storageBucket: "life-company-app.appspot.com",
  messagingSenderId: "224767738018",
  appId: "1:224767738018:web:99a76de1c3f24a063397fb",
  measurementId: "G-LP2899V2YR"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa servicios que vas a usar
export const auth = getAuth(app); // autenticación
export const db = getFirestore(app); // base de datos
export const analytics = getAnalytics(app);
