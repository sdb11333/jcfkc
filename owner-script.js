document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'admin') {
        window.location.href = 'index.html'; // Если не админ, перенаправляем на страницу входа
    }

    // Функции для админ панели
    function addUser() {
        alert('Пользователь добавлен');
    }

    function deleteUser() {
        alert('Пользователь удален');
    }

    function enable2FA() {
        document.getElementById("2fa-status").innerText = "2FA: Включено";
    }

    function logout() {
        localStorage.removeItem('userRole');
        window.location.href = 'index.html'; // Перенаправление на страницу входа
    }
});
