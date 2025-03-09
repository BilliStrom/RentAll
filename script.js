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
  try {
    const itemsCollection = collection(db, "items");
    const q = query(itemsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const itemsGrid = document.querySelector('.items-grid');
    itemsGrid.innerHTML = '';
    
    querySnapshot.forEach(doc => {
      const item = doc.data();
      itemsGrid.innerHTML += `
        <div class="item-card">
          <img src="${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p class="price">${item.price} руб/день</p>
          <p>${item.description}</p>
        </div>
      `;
    });
    
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    alert('Ошибка загрузки данных. Проверьте консоль для подробностей.');
  }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  loadItems();
});
