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
  getDownloadURL,
  onAuthStateChanged
} from './firebase.js';

// Инициализация состояния
let currentUser = null;

// Инициализация отслеживания статуса авторизации
const initAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    updateUI();
  });
};

// Обновление интерфейса
const updateUI = () => {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (currentUser) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'block';
  } else {
    if (loginBtn) loginBtn.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
};

// Обработчик входа через Google
const initGoogleLogin = () => {
  const googleLoginBtn = document.getElementById('googleLogin');
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async () => {
      try {
        await signInWithPopup(auth, provider);
        window.location.href = 'index.html';
      } catch (error) {
        showError('Ошибка входа: ' + error.message);
      }
    });
  }
};

// Функция загрузки товаров
const loadItems = async () => {
  const itemsGrid = document.querySelector('.items-grid');
  
  if (!itemsGrid) {
    console.error('Элемент .items-grid не найден');
    return;
  }

  try {
    itemsGrid.innerHTML = '<div class="loader">Загрузка...</div>';
    
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      itemsGrid.innerHTML = '<p class="empty">Объявления не найдены</p>';
      return;
    }

    itemsGrid.innerHTML = querySnapshot.docs.map(doc => {
      const item = doc.data();
      return `
        <div class="item-card">
          <img src="${item.image}" 
               alt="${item.title}" 
               class="item-image"
               onerror="this.src='https://via.placeholder.com/300x200'">
          <div class="item-info">
            <h3>${item.title || 'Без названия'}</h3>
            <p class="price">${item.price ? item.price + ' ₽/день' : 'Цена не указана'}</p>
            <p class="description">${item.description || ''}</p>
            ${currentUser ? `<button class="btn-contact" data-id="${doc.id}">Связаться</button>` : ''}
          </div>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.error('Ошибка загрузки:', error);
    showError('Не удалось загрузить объявления');
    itemsGrid.innerHTML = '<p class="error">Ошибка загрузки данных</p>';
  }
};

// Показ ошибок
const showError = (message) => {
  const errorContainer = document.getElementById('errorContainer');
  if (errorContainer) {
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    setTimeout(() => errorContainer.style.display = 'none', 5000);
  }
};

// Инициализация приложения
const initApp = () => {
  initAuthState();
  initGoogleLogin();
  loadItems();
};

// Запуск после полной загрузки страницы
document.addEventListener('DOMContentLoaded', initApp);
