import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCwkkASOyg-mpTtDenKWWpGn4mALQw9do4",
    authDomain: "rentall-7cee4.firebaseapp.com",
    projectId: "rentall-7cee4",
    storageBucket: "rentall-7cee4.firebasestorage.app",
    messagingSenderId: "789645270072",
    appId: "1:789645270072:web:98941fe4892fa8cf5e5acd",
    measurementId: "G-FLTXL7KCP4"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const itemsCollection = collection(db, "items");

import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Инициализация провайдера Google
const provider = new GoogleAuthProvider();

// Функции авторизации
export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Ошибка авторизации:", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Ошибка выхода:", error);
  }
};

// Отслеживание состояния авторизации
export const initAuth = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
    updateUI(user);
  });
};

// Обновление интерфейса
const updateUI = (user) => {
  const authLinks = document.querySelector('.auth-links');
  if (user) {
    authLinks.innerHTML = `
      <li><a href="#" id="logout">Выйти</a></li>
      <li><a href="dashboard.html">${user.displayName}</a></li>
    `;
  } else {
    authLinks.innerHTML = `
      <li><a href="#" id="login">Войти</a></li>
    `;
  }
};
