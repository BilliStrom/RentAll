// Импорты в начале файла
import { 
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from './firebase.js';

// Экспорт функции инициализации авторизации
export const initAuth = () => {
  onAuthStateChanged(auth, (user) => {
  const updateUI = (user) => {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    navLinks.innerHTML = user ? `
      <li><a href="dashboard.html">Личный кабинет</a></li>
      <li><a href="#" id="logout">Выйти</a></li>
    ` : `
      <li><a href="login.html">Войти</a></li>
      <li><a href="register.html">Регистрация</a></li>
    `;
  };

  onAuthStateChanged(auth, (user) => {
    updateUI(user);
    initMobileMenu();
  });
};

// Обработка формы регистрации
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerPasswordConfirm').value;

    // Валидация паролей
    if (password !== confirmPassword) {
      return showError('registerError', 'Пароли не совпадают');
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = './dashboard.html';
    } catch (error) {
      handleRegistrationError(error);
    }
  });
}

// Обработка ошибок регистрации
const handleRegistrationError = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      showError(
        'registerError', 
        'Этот email уже зарегистрирован. ' +
        '<a href="login.html" class="error-link">Войти?</a> ' +
        '<a href="password-reset.html" class="error-link">Забыли пароль?</a>'
      );
      break;
    case 'auth/invalid-email':
      showError('registerError', 'Неверный формат email');
      break;
    case 'auth/weak-password':
      showError('registerError', 'Пароль должен содержать минимум 6 символов');
      break;
    default:
      showError('registerError', 'Ошибка регистрации: ' + error.message);
  }
};

// Обработка восстановления пароля (отдельный блок)
const passwordResetForm = document.getElementById('passwordResetForm');
if (passwordResetForm) {
  passwordResetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    
    try {
      await sendPasswordResetEmail(auth, email);
      showError('resetError', 'Письмо с инструкциями отправлено на ваш email', 'success');
    } catch (error) {
      showError('resetError', 'Ошибка: ' + error.message);
    }
  });
}

// Функция отображения ошибок
const showError = (elementId, message, type = 'error') => {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.innerHTML = message;
    errorElement.className = `error-message ${type}`;
    errorElement.style.display = 'block';
    setTimeout(() => errorElement.style.display = 'none', 5000);
  }
};

// Инициализация мобильного меню
const initMobileMenu = () => {
  // Реализация мобильного меню
};
