import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();

const form = document.querySelector('.register-form');
const emailInput = document.getElementById('register-email');
const usernameInput = document.getElementById('register-username');
const phoneInput = document.getElementById('register-phone');
const passwordInput = document.getElementById('register-password');
const confirmPassInput = document.getElementById('confirmpass');
const registerButton = document.querySelector('.button-register button');
const dobInput = document.getElementById('register-dob');

function validateDOB() {
    const dob = new Date(dobInput.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    if (age < 15) {
        alert('You must be at least 15 years old to register.');
        return false;
    }
    return true;
}

// Validation functions
function validateEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
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

    if (password.length < 8 || !specialCharRegex.test(password)) {
        alert('Password must be at least 8 characters long and contain at least one special character.');
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

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateEmail() && validateUsername() && validatePhone() && validateDOB() && validatePassword() && validateConfirmPassword()) {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User registered successfully:', user);

                alert('Registration successful!');
                window.location.href = 'login.html';
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error("Error making new account", errorMessage);
                alert(errorMessage);
            });
    }
});
