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
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { signInWithRedirect } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Стало
document.addEventListener('DOMContentLoaded', () => {
  const updateUI = (user) => {
    const authLinks = document.querySelector('.nav-links');
    
    if (!authLinks) {
      console.log('Элемент .nav-links не найден на этой странице');
      return;
    }

    if (user) {
      authLinks.innerHTML = `
        <li><a href="dashboard.html">${user.displayName}</a></li>
        <li><a href="#" id="logout">Выйти</a></li>
      `;
    } else {
      authLinks.innerHTML = `
        <li><a href="index.html">Главная</a></li>
        <li><a href="#" id="login">Войти</a></li>
      `;
    }
  };

  // Инициализация авторизации
  onAuthStateChanged(auth, (user) => {
    updateUI(user);
  });
});

document.getElementById('loginBtn').addEventListener('click', () => {
  signInWithRedirect(auth, provider);
});
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

// Явно экспортируем все необходимые методы
export { 
  query, 
  orderBy,
  collection,
  getDocs,
  addDoc,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  ref, 
  uploadBytes, 
  getDownloadURL 
};
