const form = document.querySelector('.register-form');
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPassInput = document.getElementById('confirmpass');
const registerButton = document.querySelector('.button-register button');

function validateEmail() {
    const email = emailInput.value.trim();
    if (!email.endsWith('@gmail.com')) {
        alert('Email must end with @gmail.com');
        return false;
    }
    return true;
}

function validateUsername() {
    const username = usernameInput.value.trim();
    const specialCharRegex = /[_!@#$%^&*(),.?":{}|<>]/;
    
    if (!specialCharRegex.test(username)) {
        alert('Username must contain at least one special character.');
        return false;
    }
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const phoneRegex = /^\d+$/;
    
    if (!phoneRegex.test(phone)) {
        alert('Phone number must contain only numbers.');
        return false;
    }
    return true;
}

function validatePassword() {
    const password = passwordInput.value.trim();
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!specialCharRegex.test(password)) {
        alert('Password must contain at least one special character.');
        return false;
    }
    return true;
}

function validateConfirmPassword() {
    const password = passwordInput.value.trim();
    const confirmPass = confirmPassInput.value.trim();
    
    if (password !== confirmPass) {
        alert('Passwords do not match.');
        return false;
    }
    return true;
}

registerButton.addEventListener('click', function(event) {
    
    event.preventDefault();

    if (validateEmail() && validateUsername() && validatePhone() && validatePassword() && validateConfirmPassword()) {
        window.location.href = 'home.html';
    }
});
