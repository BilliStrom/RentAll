import { 
  db, 
  auth, 
  storage, 
  provider,
  query,
  orderBy,
  collection,
  getDocs,
  addDoc,
  signInWithPopup,
  ref,
  uploadBytes,
  getDownloadURL 
} from './firebase.js';

// Инициализация состояния
let currentUser = null;

// Для страницы login.html
if (window.location.pathname.includes('login.html')) {
  document.getElementById('googleLogin').addEventListener('click', async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.href = 'index.html'; // Перенаправление после входа
    } catch (error) {
      alert('Ошибка входа: ' + error.message);
    }
  });
}

// Функция загрузки товаров
const loadItems = async () => {
  const itemsGrid = document.querySelector('.items-grid');
  
  if (!itemsGrid) {
    console.error('Элемент .items-grid не найден');
    return;
  }

  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    itemsGrid.innerHTML = '';

    querySnapshot.forEach(doc => {
      const item = doc.data();
      itemsGrid.innerHTML += `
        <div class="item-card">
          <img src="${item.image}" 
               alt="${item.title || 'Изображение товара'}"
               class="item-image"
               onerror="this.src='https://via.placeholder.com/300x200'">
          <div class="item-info">
            <h3>${item.title || 'Без названия'}</h3>
            <p class="price">${item.price ? item.price + ' руб/день' : 'Цена не указана'}</p>
            <p>${item.description || ''}</p>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error('Ошибка загрузки:', error);
    itemsGrid.innerHTML = '<p>Не удалось загрузить объявления</p>';
  }
};

// Запуск после полной загрузки страницы
window.addEventListener('DOMContentLoaded', () => {
  loadItems();
});
