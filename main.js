import { initAuth } from './auth.js';
import { db, collection, getDocs, query, orderBy } from './firebase.js';

// Инициализация авторизации
document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    initMobileMenu();
});

// Загрузка товаров
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "items"), 
        orderBy("createdAt", "desc")
      ) // ← Добавлена закрывающая скобка для query
    );
    
    const itemsGrid = document.querySelector('.items-grid');
    if (!itemsGrid) return;

    itemsGrid.innerHTML = querySnapshot.docs.map(doc => {
      const item = doc.data();
      return `
        <div class="item-card">
          <img src="${item.image}" alt="${item.title}" 
               onerror="this.src='https://via.placeholder.com/300'">
          <div class="item-info">
            <h3>${item.title}</h3>
            <p class="price">${item.price} руб/день</p>
            <p>${item.description}</p>
          </div>
        </div>
      `;
    }).join('');
    
  } catch (error) {
    console.error('Ошибка загрузки:', error);
  }
});
