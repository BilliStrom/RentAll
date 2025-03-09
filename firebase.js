import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc,
  query, 
  orderBy 
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail  // Добавлено
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwkkASOyg-mpTtDenKWWpGn4mALQw9do4",
  authDomain: "rentall-7cee4.firebaseapp.com",
  projectId: "rentall-7cee4",
  storageBucket: "rentall-7cee4.firebasestorage.app",
  messagingSenderId: "789645270072",
  appId: "1:789645270072:web:98941fe4892fa8cf5e5acd",
  measurementId: "G-FLTXL7KCP4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

// Экспорт методов
export {
  // Firestore
  query,
  orderBy,
  collection,
  getDocs,
  addDoc,

  // Auth
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,  // Добавлено в экспорт

  // Storage
  ref,
  uploadBytes,
  getDownloadURL
};
