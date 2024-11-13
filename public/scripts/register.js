import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyDlnPImmvlGesXSzXqH-RLI4QyL2qVkKd0",
    authDomain: "pedulidisabilitas-a8543.firebaseapp.com",
    projectId: "pedulidisabilitas-a8543",
    storageBucket: "pedulidisabilitas-a8543.appspot.com",
    messagingSenderId: "422069751597",
    appId: "1:422069751597:web:a69c60bea4000914090da4",
    measurementId: "G-8PET8RYEF8"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const form = document.querySelector('.register-form');
const emailInput = document.getElementById('register-email');
const usernameInput = document.getElementById('register-username');
const nameInput = document.getElementById('register-name');
const phoneInput = document.getElementById('register-phone');
const passwordInput = document.getElementById('register-password');
const confirmPassInput = document.getElementById('confirmpass');
const registerButton = document.querySelector('.button-register button');
const dobInput = document.getElementById('register-dob');

function validateName() {
    const name = nameInput.value.trim();
    const specialCharRegex = /[_!@#$%^&*(),.?":{}|<>]/;
    
    if (specialCharRegex.test(name)) {
        alert('Name must not contain any special characters.');
        return false;
    }
    return true;
}

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

function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        alert('Please select a gender.');
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

    if (validateEmail() && validateUsername() && validatePhone() && validateDOB() && validatePassword() && validateConfirmPassword() && validateGender()) {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const dob = dobInput.value.trim();
        const username = usernameInput.value.trim();
        const gender = document.querySelector('input[name="gender"]:checked').value;

        // Register the user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;  // Get the registered user's UID

                // Store additional user data in Firestore using the UID
                await setDoc(doc(db, "users", user.uid), {
                    username: username,
                    name: name,
                    email: email,
                    phone: phone,
                    dob: dob,
                    gender: gender
                });

                alert('Registration successful!');
                window.location.href = 'login.html';  // Redirect to login page or wherever appropriate
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error("Error making new account", errorMessage);
                alert(errorMessage);
            });
    }
});


// form.addEventListener('submit', function(event) {
//     event.preventDefault();

//     if (validateEmail() && validateUsername() && validatePhone() && validateDOB() && validatePassword() && validateConfirmPassword()) {
//         const email = emailInput.value.trim();
//         const password = passwordInput.value.trim();
//         const name = nameInput.value.trim();
//         const phone = phoneInput.value.trim();
//         const dob = dobInput.value.trim();
//         const username = usernameInput.value.trim();

//         createUserWithEmailAndPassword(auth, email, password)
//             .then(async (userCredential) => {
//                 const user = userCredential.user;
//                 console.log('User registered successfully:', user);

//                 // Store additional user data in Firestore
//                 await setDoc(doc(db, "users", user.uid), {
//                     username: username,
//                     name: name,
//                     email: email,
//                     phone: phone,
//                     dob: dob
//                 });

//                 alert('Registration successful!');
//                 window.location.href = 'login.html';
//             })
//             .catch((error) => {
//                 const errorMessage = error.message;
//                 console.error("Error making new account", errorMessage);
//                 alert(errorMessage);
//             });
//     }
// });