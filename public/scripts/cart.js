function updateQuantity(amount, index) {
    const quantityInput = document.getElementById(`quantity${index}`);
    let quantity = parseInt(quantityInput.value) + amount;
    if (quantity < 1) quantity = 1;
    quantityInput.value = quantity;
    updateCart();
}

function updateCart() {
    const prices = [20000, 150000];
    let subtotal = 0;

    prices.forEach((price, index) => {
        const quantity = parseInt(document.getElementById(`quantity${index}`).value);
        const subTotal = price * quantity;
        document.getElementById(`subtotal${index}`).innerText = `Rp${subTotal.toLocaleString('id-ID')},-`;
        subtotal += subTotal;
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('subtotal').innerText = `Rp${subtotal.toLocaleString('id-ID')},-`;
    document.getElementById('tax').innerText = `Rp${tax.toLocaleString('id-ID')},-`;
    document.getElementById('total').innerText = `Rp${total.toLocaleString('id-ID')},-`;
}
