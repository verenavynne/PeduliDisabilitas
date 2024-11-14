import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user);
        displayTotalOnPaymentButton(user.uid);
    } else {
        console.log("No user logged in.");
        window.location.href = "login.html";
    }
});

async function loadCartData(userId) {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        console.log("Cart Data:", cartData);
        const total = cartData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        document.querySelector(".payment-button").textContent = `Rp. ${total.toLocaleString("id-ID")}`;
    }
}

async function displayTotalOnPaymentButton(userId) {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        const subtotal = cartData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = subtotal * 0.1; 
        const totalAmount = subtotal + tax;

        document.querySelector(".payment-button").textContent = `Rp. ${totalAmount.toLocaleString("id-ID")}`;
    } else {
        console.log("No cart found for this user.");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const totalAmount = await getCartTotal();
    const paymentButton = document.querySelector(".payment-button");
    if (paymentButton) {
        paymentButton.textContent = `Rp. ${totalAmount.toLocaleString("id-ID")}`;
    }
});

const cardTypePatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
};

document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvc = document.getElementById("cvc").value;
    const cardholderName = document.getElementById("cardholder-name").value;
    const country = document.getElementById("country").value;

    if (!email || !cardNumber || !expiry || !cvc || !cardholderName || !country) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate card number format and apply Luhn algorithm check
    if (!validateCardNumber(cardNumber)) {
        alert("Please enter a valid card number.");
        return;
    }

    // Validate expiry date format and check if it’s not in the past
    if (!validateExpiryDate(expiry)) {
        alert("Please enter a valid expiry date in MM/YY format.");
        return;
    }

    // Validate CVC format (3-4 digits depending on card type)
    if (!validateCVC(cvc, cardNumber)) {
        alert("Please enter a valid CVC.");
        return;
    }

    // Validate cardholder name
    if (!/^[a-zA-Z\s]+$/.test(cardholderName)) {
        alert("Please enter a valid cardholder name.");
        return;
    }

    // If all validations pass
    alert("Payment information is valid. Proceeding with payment.");
    window.location.href = "checkout.html";

    alert("Payment information submitted successfully!");
    window.location.href = "checkout.html";
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateCardNumber(number) {
    // Remove all spaces for validation
    const cleaned = number.replace(/\s+/g, '');
    
    // Check if it matches the known card type patterns
    const isValidPattern = Object.values(cardTypePatterns).some((pattern) => pattern.test(cleaned));
    if (!isValidPattern) {
        return false;
    }
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

function validateExpiryDate(expiry) {
    const [month, year] = expiry.split("/").map(Number);
    if (!month || !year || month < 1 || month > 12) return false;

    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed

    return year > currentYear || (year === currentYear && month >= currentMonth);
}

// Helper function for CVC validation
function validateCVC(cvc, cardNumber) {
    const isAmex = cardTypePatterns.amex.test(cardNumber);
    const cvcPattern = isAmex ? /^\d{4}$/ : /^\d{3}$/; // 4 digits for Amex, 3 digits for others
    return cvcPattern.test(cvc);
}