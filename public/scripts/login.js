import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

document.addEventListener('DOMContentLoaded', () => {

  const auth = getAuth(); 
  const resetLink = document.querySelector('.reset-link');
  const form = document.getElementById('login-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();

      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!validatePassword(password)) {
        alert("Password must be at least 8 characters long.");
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User logged in successfully:', user);
          alert('Login successful!');
          window.location.href = 'home.html';
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error('Login error:', errorMessage);
          alert(errorMessage);
        });
    });
  } else {
    console.error('Login form not found');
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email); 
  }

  function validatePassword(password) {
    return password.length >= 8; 
  }
});





