import { db, auth, itemsCollection } from './firebase.js';
import { getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const loadItems = async () => {
    const itemsGrid = document.querySelector('.items-grid');
    try {
        const querySnapshot = await getDocs(itemsCollection);
        itemsGrid.innerHTML = '';
        
        querySnapshot.forEach(doc => {
            const item = doc.data();
            itemsGrid.innerHTML += `
                <article class="item-card">
                    <img src="${item.image || 'https://via.placeholder.com/300'}" 
                         alt="${item.title}" 
                         class="item-image"
                         onerror="this.src='https://via.placeholder.com/300'">
                    <div class="item-info">
                        <h3>${item.title}</h3>
                        <p class="price">${item.price ?? 'Цена не указана'} руб/день</p>
                        <p>${item.description || ''}</p>
                        <button class="btn btn-primary" data-id="${doc.id}">Арендовать</button>
                    </div>
                </article>
            `;
        });

        // Добавляем обработчики событий после рендеринга
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('click', () => rentItem(btn.dataset.id));
        });
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
};

const rentItem = async (itemId) => {
    if (!auth.currentUser) {
        alert('Пожалуйста, войдите в систему, чтобы арендовать товар.');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        await addDoc(collection(db, "bookings"), {
            userId: auth.currentUser.uid,
            itemId,
            date: new Date().toISOString(),
        });
        alert('Товар успешно арендован!');
    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
};

// Инициализация
let currentUser = null;

initAuth((user) => {
  currentUser = user;
  document.getElementById('addBtn').style.display = user ? 'block' : 'none';
});

// Обработчики авторизации
document.addEventListener('click', async (e) => {
  if (e.target.id === 'login') {
    await signInWithGoogle();
  }
  if (e.target.id === 'logout') {
    await logout();
  }
});

// Работа с объявлениями
document.getElementById('addBtn').addEventListener('click', () => {
  document.getElementById('addModal').style.display = 'block';
});

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  if (!currentUser) {
    alert('Требуется авторизация!');
    return;
  }

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = Number(document.getElementById('price').value);
  const imageFile = document.getElementById('image').files[0];

  try {
    // Загрузка изображения
    let imageUrl = '';
    if (imageFile) {
      const storageRef = ref(storage, `items/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    // Добавление документа
    await addDoc(itemsCollection, {
      title,
      description,
      price,
      image: imageUrl,
      userId: currentUser.uid,
      createdAt: new Date().toISOString()
    });

    alert('Объявление успешно добавлено!');
    loadItems();
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('addForm').reset();
    
  } catch (error) {
    alert('Ошибка: ' + error.message);
  }
});
// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    loadItems();
});
