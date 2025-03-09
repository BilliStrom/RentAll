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
            // Обработка ошибок
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
        }
    });
}

// Отдельный обработчик для восстановления пароля
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
