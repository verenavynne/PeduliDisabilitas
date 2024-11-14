document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const email = document.getElementById("email").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiry = document.getElementById("expiry").value;
    const cvc = document.getElementById("cvc").value;
    const cardholderName = document.getElementById("cardholder-name").value;
    const country = document.getElementById("country").value;

    // Basic validation
    if (!email || !cardNumber || !expiry || !cvc || !cardholderName || !country) {
        alert("Please fill in all required fields.");
        return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert("Please enter a valid expiry date in MM/YY format.");
        return;
    }

    if (!/^\d{3}$/.test(cvc)) {
        alert("Please enter a valid 3-digit CVC.");
        return;
    }

    alert("Payment information submitted successfully!");
    // Here you can add the functionality to process the payment.
});
