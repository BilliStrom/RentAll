import { 
  auth, 
  provider, 
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut 
} from './firebase.js';

export const initAuth = () => {
  document.addEventListener('DOMContentLoaded', () => {
    // Обновление UI
    const updateUI = (user) => {
      const authLinks = document.querySelector('.nav-links');
      if (!authLinks) return;

      authLinks.innerHTML = user ? `
        <li><a href="dashboard.html">${user.displayName}</a></li>
        <li><a href="#" id="logout">Выйти</a></li>
      ` : `
        <li><a href="index.html">Главная</a></li>
        <li><a href="#" id="login">Войти</a></li>
      `;
    };

    // Обработчики событий
    document.addEventListener('click', async (e) => {
      if (e.target.id === 'login') {
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          if (error.code === 'auth/popup-blocked') {
            await signInWithRedirect(auth, provider);
          }
        }
      }
      
      if (e.target.id === 'logout') {
        await signOut(auth);
      }
    });

    // Следим за состоянием аутентификации
    onAuthStateChanged(auth, (user) => {
      updateUI(user);
    });
  });
};
