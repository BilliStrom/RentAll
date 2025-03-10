import { db, auth, collection, getDocs, query, where } from './firebase.js';

export const loadUserItems = async () => {
  try {
    const itemsRef = collection(db, "items");
    const q = query(itemsRef, where("userId", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);

    const itemsContainer = document.getElementById('userItems');
    itemsContainer.innerHTML = snapshot.docs.map(doc => `
      <div class="item-card">
        <h3>${doc.data().title}</h3>
        <p>Цена: ${doc.data().price} руб/день</p>
      </div>
    `).join('');
    
  } catch (error) {
    console.error("Ошибка загрузки:", error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (!auth.currentUser) window.location.href = 'login.html';
  loadUserItems();
});
