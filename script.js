import { initAuth, db, auth } from './firebase.js';
import { getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

let currentUser = null;

// Инициализация авторизации
initAuth((user) => {
  currentUser = user;
  document.getElementById('addBtn').style.display = user ? 'block' : 'none';
});

const loadItems = async () => {
    const itemsGrid = document.querySelector('.items-grid');
    try {
        const querySnapshot = await getDocs(collection(db, "items"));
        itemsGrid.innerHTML = '';
        
        querySnapshot.forEach(doc => {
            const item = doc.data();
            itemsGrid.innerHTML += `
                <article class="item-card">
                    <img src="${item.image}" 
                         alt="${item.title}" 
                         class="item-image"
                         onerror="this.src='https://via.placeholder.com/300'">
                    <div class="item-info">
                        <h3>${item.title}</h3>
                        <p class="price">${item.price} руб/день</p>
                        <p>${item.description}</p>
                        <button class="btn btn-primary" data-id="${doc.id}">Арендовать</button>
                    </div>
                </article>
            `;
        });

        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', () => rentItem(btn.dataset.id));
        });
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
};

const rentItem = async (itemId) => {
    if (!auth.currentUser) {
        alert('Пожалуйста, войдите в систему!');
        return;
    }
    
    try {
        await addDoc(collection(db, "bookings"), {
            userId: auth.currentUser.uid,
            itemId,
            date: new Date().toISOString(),
        });
        alert('Товар арендован!');
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
};

// Загрузка данных при старте
document.addEventListener('DOMContentLoaded', loadItems);
