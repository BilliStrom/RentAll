import { 
  db, auth, storage, initAuth,
  signInWithPopup, provider, 
  collection, addDoc, getDocs,
  ref, uploadBytes, getDownloadURL 
} from './firebase.js';

let currentUser = null;

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  initAuth((user) => {
    currentUser = user;
    document.getElementById('addBtn').style.display = user ? 'block' : 'none';
  });

  // Обработчики кликов
  document.addEventListener('click', async (e) => {
    if (e.target.id === 'login') {
      await signInWithPopup(auth, provider);
    }
    if (e.target.id === 'logout') {
      await auth.signOut();
      window.location.href = '/';
    }
    if (e.target.closest('.btn-close')) {
      document.getElementById('addModal').style.display = 'none';
    }
  });

  loadItems();
});

const loadItems = async () => {
  const loader = document.createElement('div');
  loader.className = 'loader';
  document.querySelector('.items-grid').append(loader);

  try {
    // Правильное использование query с orderBy
    const q = query(
      collection(db, "items"), 
      orderBy("createdAt", "desc")
    );
    
    const snapshot = await getDocs(q);
    
    const itemsHTML = snapshot.docs.map(doc => {
      const item = doc.data();
      return `
        <div class="item-card">
          <img src="${item.image}" alt="${item.title}" 
               onerror="this.src='https://via.placeholder.com/300'">
          <div class="item-info">
            <h3>${item.title}</h3>
            <p class="price">${item.price} ₽/день</p>
            <p>${item.description}</p>
            ${currentUser ? `<button data-id="${doc.id}">Арендовать</button>` : ''}
          </div>
        </div>
      `;
    }).join('');

    document.querySelector('.items-grid').innerHTML = itemsHTML;

  } catch (error) {
    console.error('Ошибка загрузки:', error);
    alert('Не удалось загрузить объявления');
  } finally {
    loader.remove();
  }
};

// Добавление товара
document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const imageFile = formData.get('image');
  
  try {
    // Загрузка изображения
    const storageRef = ref(storage, `items/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    // Сохранение в Firestore
    await addDoc(collection(db, "items"), {
      ...Object.fromEntries(formData),
      image: imageUrl,
      userId: currentUser.uid,
      createdAt: new Date().toISOString()
    });

    loadItems();
    e.target.reset();
    document.getElementById('addModal').style.display = 'none';
  } catch (error) {
    alert(`Ошибка: ${error.message}`);
  }
});
