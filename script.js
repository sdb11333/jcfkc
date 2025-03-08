<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход</title>
    <script>
        // Список пользователей для первоначальной загрузки (только один раз)
        const users = [
            { username: 'admin', password: 'adminpassword', role: 'admin' },
            { username: 'owner', password: 'ownerpassword', role: 'owner' },
            { username: 'user1', password: 'userpassword', role: 'user' },
            { username: 'user2', password: 'userpassword', role: 'user' }
        ];

        // Сохраняем пользователей в localStorage (если их еще нет)
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(users));
        }

        // Логика для входа
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Отменить отправку формы

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Получаем пользователей из localStorage
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            // Проверяем логин и пароль
            const user = storedUsers.find(u => u.username === username && u.password === password);

            if (user) {
                // Сохраняем роль пользователя в localStorage
                localStorage.setItem('userRole', user.role);
                logAction(`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} вошел в систему`); // Логируем действие

                // Перенаправляем в соответствующую панель
                if (user.role === 'owner') {
                    window.location.href = 'ownerPanel.html'; // Панель основателя
                } else if (user.role === 'admin') {
                    window.location.href = 'adminPanel.html'; // Панель администратора
                } else {
                    window.location.href = 'userPanel.html'; // Панель пользователя
                }
            } else {
                alert('Неверный логин или пароль');
            }
        });

        // Функция для логирования действий
        function logAction(action) {
            const date = new Date().toLocaleString();
            const user = localStorage.getItem('userRole') || "Пользователь"; // Получаем текущего пользователя из LocalStorage
            const logEntry = { date, user, action };

            // Сохраняем в LocalStorage
            let logs = JSON.parse(localStorage.getItem('logs')) || [];
            logs.push(logEntry);
            localStorage.setItem('logs', JSON.stringify(logs));

            // Динамически добавляем строку в таблицу, если на странице есть элемент с id="log-table"
            const table = document.getElementById("log-table");
            if (table) {
                const row = table.insertRow(-1);
                row.insertCell(0).innerText = logEntry.date;
                row.insertCell(1).innerText = logEntry.user;
                row.insertCell(2).innerText = logEntry.action;
            }
        }

        // Функция для загрузки журнала из LocalStorage при загрузке страницы
        function loadLogs() {
            const logs = JSON.parse(localStorage.getItem('logs')) || [];
            const table = document.getElementById("log-table");

            logs.forEach(log => {
                const row = table.insertRow(-1);
                row.insertCell(0).innerText = log.date;
                row.insertCell(1).innerText = log.user;
                row.insertCell(2).innerText = log.action;
            });
        }

        // Загружаем все логи при инициализации, если на странице есть элемент с id="log-table"
        window.onload = function() {
            loadLogs();
        };
    </script>
</head>
<body>

    <h2>Вход в систему</h2>

    <form id="loginForm">
        <div>
            <label for="username">Имя пользователя:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" required>
        </div>

        <button type="submit">Войти</button>
    </form>

</body>
</html>
