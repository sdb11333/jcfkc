document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('userRole', 'admin');
        window.location.href = 'admin-panel.html'; // Перенаправление на админ панель
    } else if (username === 'owner' && password === 'owner123') {
        localStorage.setItem('userRole', 'owner');
        window.location.href = 'owner-panel.html'; // Перенаправление на панель основателя
    } else {
        alert('Неверный логин или пароль');
    }
});
