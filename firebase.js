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
