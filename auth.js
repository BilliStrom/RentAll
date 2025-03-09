import { 
  auth, 
  provider, 
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut 
} from './firebase.js';

// В файле auth.js
export const initAuth = () => {
  const updateUI = (user) => {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;

    navLinks.innerHTML = user ? `
      <li><a href="index.html">Главная</a></li>
      <li><a href="dashboard.html">Личный кабинет</a></li>
      <li><a href="#" id="logout">Выйти</a></li>
    ` : `
      <li><a href="index.html">Главная</a></li>
      <li><a href="#" id="login">Войти</a></li>
      <li><a href="register.html">Регистрация</a></li>
    `;
  };

  onAuthStateChanged(auth, (user) => {
    updateUI(user);
    initMobileMenu();
  });
};

const initMobileMenu = () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
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
