import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
import { 
  getFirestore,
  collection, 
  addDoc,
  getDocs,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAvSwN3ixzAeun5lv8tpe8OY-Ps0TkoGKM",
  authDomain: "rosalia-b2798.firebaseapp.com",
  projectId: "rosalia-b2798",
  storageBucket: "rosalia-b2798.appspot.com",
  messagingSenderId: "331091686613",
  appId: "1:331091686613:web:c8e886e52c825e9d69de5c",
  measurementId: "G-2NHYDL4KXZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Métodos de Autenticación

// Registro de Usuario
export const registerauth = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Verificación por correo
export const verification = () =>
  sendEmailVerification(auth.currentUser);

// Autenticación de usuario
export const loginauth = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Inicio Sesión Google
export const googleauth = (provider) =>
  signInWithPopup(auth, provider);

// Inicio Sesión Facebook
export const facebookauth = (provider) =>
  signInWithPopup(auth, provider);

// Estado del Usuario logeado
export function userstate(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
    } else {
      window.location.href='../Index.html';
    }
  });
}

// Restablecer contraseña por correo
export const recoverypass = (email) =>
  sendPasswordResetEmail(auth, email);

// Cerrar sesión del usuario
export const loginout = () =>
  signOut(auth);

// Eliminar usuario
export const deleteuser = async (user) => {
  try {
    await deleteUser(user);
    // Eliminar el usuario de Firestore
    const userRef = doc(db, "Usuarios", user.uid);
    await deleteDoc(userRef);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { auth };

// Métodos de Firestore Database

// Agregar Datos
export const addregister = (nombres, apellidos, fecha, cedula, estado, rh, genero, telefono, direccion, email) =>
  addDoc(collection(db, "Usuarios"), {
    nombre: nombres,
    apellido: apellidos,
    fecha: fecha,
    cedula: cedula,
    estado: estado,
    rh: rh,
    genero: genero,
    telefono: telefono,
    direccion: direccion,
    email: email
  });

// Mostrar productos
export const productosv = () =>
  getDocs(collection(db, "Usuarios"));