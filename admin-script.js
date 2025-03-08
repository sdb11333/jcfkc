// Код для админ панели
document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'admin') {
        window.location.href = 'index.html'; // Если не админ, перенаправляем на страницу входа
    }

    // Добавить здесь код для функционала панели администратора
});
