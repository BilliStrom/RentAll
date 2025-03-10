import { db, auth, collection, getDocs, query, where } from './firebase.js';

// Добавьте проверку авторизации
export const loadUserItems = async () => {
    if (!auth.currentUser) {
        window.location.href = './login.html';
        return;
    }
    try {
        const itemsCollection = collection(db, "items");
        const q = query(itemsCollection, where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const userItems = document.getElementById('userItems');
        userItems.innerHTML = querySnapshot.docs.map(doc => {
            const item = doc.data();
            return `
                <div class="user-item">
                    <img src="${item.image}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p>${item.price} руб/день</p>
                    <button class="btn btn-danger" data-id="${doc.id}">Удалить</button>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (auth.currentUser) {
        loadUserItems();
    } else {
        window.location.href = './login.html';
    }
});
