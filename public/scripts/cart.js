// FIRESTORE

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, updateDoc, setDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


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
const db = getFirestore();
const auth = getAuth();

function loadCart() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in
            const cartRef = doc(db, "carts", user.uid);
            const cartSnap = await getDoc(cartRef);

            if (cartSnap.exists()) {
                const cartData = cartSnap.data();
                displayCartItems(cartData.items || []);
            } else {
                console.log("No cart found for this user.");
                displayCartItems([]);  // Empty cart
            }
        } else {
            // No user is signed in
            console.log("No user is logged in.");
            displayCartItems([]);  // Empty cart
        }
    });
}

async function updateQuantity(change, index, productId, price) {
    const quantityInput = document.getElementById(`quantity${index}`);
    let newQuantity = parseInt(quantityInput.value) + change;

    // Ensure quantity is at least 1
    if (newQuantity < 1) {
        newQuantity = 1;
    }

    // Update the quantity input field
    quantityInput.value = newQuantity;

    // Calculate and update subtotal for this item
    const subtotalElem = document.getElementById(`subtotal${index}`);
    const newSubtotal = newQuantity * price;
    subtotalElem.textContent = `Rp ${newSubtotal.toLocaleString("id-ID")}`;

    // Recalculate cart totals
    recalculateCartTotals();

    // Update Firestore with the new quantity
    const user = auth.currentUser;
    if (user) {
        const cartRef = doc(db, "carts", user.uid);
        
        try {
            // Update the specific item quantity in Firestore
            const cartSnap = await getDoc(cartRef);
            if (cartSnap.exists()) {
                const cartData = cartSnap.data();
                const updatedItems = cartData.items.map(item => 
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                );

                await updateDoc(cartRef, {
                    items: updatedItems
                });
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    }
}

function displayCartItems(items) {
    const cartTableBody = document.querySelector(".cart-table tbody");
    cartTableBody.innerHTML = "";  // Clear existing items

    items.forEach((item, index) => {
        const row = document.createElement("tr");

        // Product info cell
        const productInfoCell = document.createElement("td");
        productInfoCell.classList.add("product-info");
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "✖";
        // Event listener for remove button (you may implement this function separately)
        removeBtn.addEventListener("click", () => removeItemFromCart(item.id));
        
        const img = document.createElement("img");
        img.src = item.imageUrl;
        img.alt = item.name;
        
        const nameSpan = document.createElement("span");
        nameSpan.textContent = item.name;

        productInfoCell.appendChild(removeBtn);
        productInfoCell.appendChild(img);
        productInfoCell.appendChild(nameSpan);

        // Price cell
        const priceCell = document.createElement("td");
        priceCell.textContent = `Rp ${item.price.toLocaleString("id-ID")}`;

        // Quantity cell with buttons
        const quantityCell = document.createElement("td");
        quantityCell.classList.add("quantity");

        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-";
        minusBtn.classList.add("quantity-btn");
        minusBtn.addEventListener("click", () => updateQuantity(-1, index, item.id, item.price));

        const quantityInput = document.createElement("input");
        quantityInput.type = "text";
        quantityInput.value = item.quantity;
        quantityInput.classList.add("quantity-input");
        quantityInput.id = `quantity${index}`;
        quantityInput.addEventListener("change", () => updateQuantity(0, index, item.id, item.price));  // Update Firestore on change

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.classList.add("quantity-btn");
        plusBtn.addEventListener("click", () => updateQuantity(1, index, item.id, item.price));

        quantityCell.appendChild(minusBtn);
        quantityCell.appendChild(quantityInput);
        quantityCell.appendChild(plusBtn);

        // Sub-total cell
        const subtotalCell = document.createElement("td");
        subtotalCell.classList.add("sub-total");
        subtotalCell.id = `subtotal${index}`;
        subtotalCell.textContent = `Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`;

        // Append cells to row
        row.appendChild(productInfoCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(subtotalCell);

        // Append row to table body
        cartTableBody.appendChild(row);
    });

    // Update cart totals after rendering all items
    recalculateCartTotals();
}

function recalculateCartTotals() {
    const cartTableBody = document.querySelector(".cart-table tbody");
    const subtotalElem = document.getElementById("subtotal");
    const taxElem = document.getElementById("tax");
    const totalElem = document.getElementById("total");

    let subtotal = 0;
    cartTableBody.querySelectorAll(".sub-total").forEach((cell) => {
        subtotal += parseFloat(cell.textContent.replace(/[^\d]/g, ""));
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    subtotalElem.textContent = `Rp ${subtotal.toLocaleString("id-ID")}`;
    taxElem.textContent = `Rp ${tax.toLocaleString("id-ID")}`;
    totalElem.textContent = `Rp ${total.toLocaleString("id-ID")}`;
}

// Call loadCart when the page loads
window.addEventListener("DOMContentLoaded", loadCart);

// Define variables to hold subtotal and total amounts
// let subtotal = 0;
// const taxRate = 0.1; // 10% tax, adjust as needed

// function updateCartTotals() {
//     const taxAmount = subtotal * taxRate;
//     const totalAmount = subtotal + taxAmount;

//     document.getElementById("subtotal").textContent = `Rp ${subtotal.toLocaleString("id-ID")}`;
//     document.getElementById("tax").textContent = `Rp ${taxAmount.toLocaleString("id-ID")}`;
//     document.getElementById("total").textContent = `Rp ${totalAmount.toLocaleString("id-ID")}`;
// }

// window.updateQuantity = function(change, itemIndex, itemId, itemPrice) {
//     const quantityInput = document.getElementById(`quantity${itemIndex}`);
//     let quantity = parseInt(quantityInput.value);

//     quantity += change;
//     if (quantity < 1) quantity = 1;

//     quantityInput.value = quantity;

//     // Update Firestore with new quantity
//     const user = auth.currentUser;
//     if (user) {
//         const cartRef = doc(db, "carts", user.uid);
//         updateDoc(cartRef, {
//             [`items.${itemIndex}.quantity`]: quantity
//         }).then(() => {
//             console.log("Quantity updated in Firestore");
//         }).catch((error) => {
//             console.error("Error updating quantity:", error);
//         });
//     }

//     // Update the subtotal for this item
//     const itemSubtotal = itemPrice * quantity;
//     document.getElementById(`subtotal${itemIndex}`).textContent = `Rp ${itemSubtotal.toLocaleString("id-ID")}`;

//     // Recalculate and update the overall cart totals
//     recalculateCartTotals();
// };

// function recalculateCartTotals() {
//     subtotal = 0;
//     const cartItems = document.querySelectorAll(".sub-total");
//     cartItems.forEach((item) => {
//         const itemSubtotal = parseFloat(item.textContent.replace(/[Rp.,\s]/g, ""));
//         subtotal += itemSubtotal;
//     });
//     updateCartTotals();
// }

// function displayCartItem(item, index) {
//     const cartTableBody = document.querySelector('.cart-table tbody');

//     const row = document.createElement('tr');

//     const productInfo = document.createElement('td');
//     productInfo.classList.add('product-info');
//     productInfo.innerHTML = `
//         <button class="remove-btn">✖</button>
//         <img src="${item.imageUrl}" alt="${item.name}">
//         <span>${item.name}</span>
//     `;

//     const price = document.createElement('td');
//     price.textContent = `Rp ${item.price.toLocaleString("id-ID")}`;

//     const quantity = document.createElement('td');
//     quantity.classList.add('quantity');
//     quantity.innerHTML = `
//         <button class="quantity-btn" onclick="updateQuantity(-1, ${index}, '${item.id}', ${item.price})">-</button>
//         <input type="text" value="${item.quantity}" class="quantity-input" id="quantity${index}">
//         <button class="quantity-btn" onclick="updateQuantity(1, ${index}, '${item.id}', ${item.price})">+</button>
//     `;

//     const subTotal = document.createElement('td');
//     subTotal.classList.add('sub-total');
//     const itemTotal = item.price * item.quantity;
//     subTotal.textContent = `Rp ${itemTotal.toLocaleString("id-ID")}`;
//     subTotal.id = `subtotal${index}`;
//     subtotal += itemTotal;

//     row.appendChild(productInfo);
//     row.appendChild(price);
//     row.appendChild(quantity);
//     row.appendChild(subTotal);

//     cartTableBody.appendChild(row);
// }

// function loadCart() {
//     onAuthStateChanged(auth, async (user) => {
//         if (user) {
//             const cartRef = doc(db, "carts", user.uid);
//             const cartSnap = await getDoc(cartRef);

//             if (cartSnap.exists()) {
//                 const cartData = cartSnap.data();
//                 const items = cartData.items || [];

//                 items.forEach((item, index) => displayCartItem(item, index));

//                 // Update the cart totals after displaying all items
//                 updateCartTotals();
//             } else {
//                 console.log("No cart data found for this user.");
//             }
//         } else {
//             console.log("User is not logged in.");
//         }
//     });
// }

// loadCart();



