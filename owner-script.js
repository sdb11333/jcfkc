// Код для панели основателя
document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('userRole');

    if (userRole !== 'owner') {
        window.location.href = 'index.html'; // Если не основатель, перенаправляем на страницу входа
    }

    // Добавить здесь код для функционала панели основателя
});
