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
    console.error('Ошибка: элемент с классом "items-grid" не найден');
    return;
  }

  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    itemsGrid.innerHTML = ''; // Теперь безопасно

    querySnapshot.forEach(doc => {
      const item = doc.data();
      itemsGrid.innerHTML += `
        <div class="item-card">
          <h3>${item.title}</h3>
          <p>Цена: ${item.price} руб/день</p>
        </div>
      `;
    });
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    itemsGrid.innerHTML = '<p>Не удалось загрузить товары</p>';
  }
};

// Запуск после полной загрузки страницы
window.addEventListener('DOMContentLoaded', () => {
  loadItems();
});
