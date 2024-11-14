document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent actual form submission for validation

    // Get form values
    const email = document.getElementById("email").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvc = document.getElementById("cvc").value;
    const cardholderName = document.getElementById("cardholder-name").value;
    const country = document.getElementById("country").value;

    // Check for required fields
    if (!email || !cardNumber || !expiry || !cvc || !cardholderName || !country) {
        alert("Please fill in all required fields.");
        return;
    }

    // Email validation
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Card number validation (assuming 16 digits)
    if (!/^\d{10}$/.test(cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return;
    }

    // Expiry validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        alert("Please enter a valid expiry date in MM/YY format.");
        return;
    }

    // CVC validation (3 digits)
    if (!/^\d{3}$/.test(cvc)) {
        alert("Please enter a valid 3-digit CVC.");
        return;
    }

    // Cardholder name validation
    if (!/^[a-zA-Z\s]+$/.test(cardholderName)) {
        alert("Please enter a valid cardholder name.");
        return;
    }

    // If all validations pass, simulate submission and redirect
    alert("Payment information submitted successfully!");
    window.location.href = "checkout.html"; // Redirect to checkout page
});

// Helper function for email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
