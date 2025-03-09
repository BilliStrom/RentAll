import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { 
  getFirestore, collection, getDocs, addDoc, 
  query, where, orderBy 
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { 
  getAuth, signInWithPopup, GoogleAuthProvider, 
  signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { 
  getStorage, ref, uploadBytes, getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCwkkASOyg-mpTtDenKWWpGn4mALQw9do4",
    authDomain: "rentall-7cee4.firebaseapp.com",
    projectId: "rentall-7cee4",
    storageBucket: "rentall-7cee4.firebasestorage.app",
    messagingSenderId: "789645270072",
    appId: "1:789645270072:web:98941fe4892fa8cf5e5acd",
    measurementId: "G-FLTXL7KCP4"

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

// Экспортируемые функции
export { 
  db, auth, storage, provider,
  signInWithPopup, signOut, 
  getDocs, addDoc, collection,
  ref, uploadBytes, getDownloadURL,
  query, where, orderBy 
};

export const initAuth = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
    updateUI(user);
  });
};

const updateUI = (user) => {
  const navLinks = document.querySelector('.nav-links');
  if (user) {
    navLinks.innerHTML = `
      <li><a href="dashboard.html">Мои объявления</a></li>
      <li><a href="#" id="logout">Выйти</a></li>
      <li class="user-avatar"><img src="${user.photoURL}" alt="Аватар"></li>
    `;
  } else {
    navLinks.innerHTML = `
      <li><a href="index.html">Главная</a></li>
      <li><a href="#" id="login">Войти</a></li>
    `;
  }
};
