<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RentAll - Вход</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <nav>
            <div class="nav-container">
                <h1>RentAll</h1>
                <ul class="nav-links" id="navLinks"></ul>
            </div>
        </nav>
    </header>

    <main>
        <div class="auth-container">
            <form id="loginForm" class="auth-form">
                <h2>Вход</h2>
                <input type="email" id="loginEmail" placeholder="Email" required>
                <input type="password" id="loginPassword" placeholder="Пароль" required>
                <div id="loginError" class="error-message"></div>
                <button type="submit">Войти</button>
                <p>Нет аккаунта? <a href="register.html">Зарегистрируйтесь</a></p>
            </form>
        </div>
    </main>

    <script type="module">
        import { handleLogin } from './auth.js';
        
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            await handleLogin(email, password);
        });
    </script>
</body>
</html>
