const form = document.querySelector('.login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('.button-login button');

loginButton.addEventListener('click', function(event) {
    
    event.preventDefault(); 
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const usernameRegex = /[_!@#$%^&*(),.?":{}|<>]/
    if (!usernameRegex.test(username)) {
        alert('Username must be containt at least one special character');
        return;
    }

    const passwordRegex = /[_!@#$%^&*(),.?":{}|<>]/;
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.');
        return;
    }

    window.location.href = 'home.html';
});
