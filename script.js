// Логика для входа
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменить отправку формы

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Проверяем логин и пароль
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('userRole', 'admin');
        logAction('Администратор вошел в систему'); // Логируем действие
        window.location.href = 'admin-panel.html'; // Перенаправление на админ панель
    } else if (username === 'owner' && password === 'owner123') {
        localStorage.setItem('userRole', 'owner');
        logAction('Основатель вошел в систему'); // Логируем действие
        window.location.href = 'owner-panel.html'; // Перенаправление на панель основателя
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
