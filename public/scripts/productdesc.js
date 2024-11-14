import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, updateDoc, arrayUnion, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function addToCart(product) {
    const user = auth.currentUser;
    if (!user) {
        alert("Please log in to add items to your cart.");
        return;
    }

    const cartDocRef = doc(db, "carts", user.uid);

    try {
        // Use Firestore's arrayUnion to add the product to the "items" array in the user's cart
        await updateDoc(cartDocRef, {
            items: arrayUnion({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                imageUrl: product.imageUrl
            })
        });
    } catch (error) {
        // If the cart document doesn't exist, create it
        if (error.code === 'not-found') {
            await setDoc(cartDocRef, {
                items: [{
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    imageUrl: product.imageUrl
                }]
            });
        } else {
            console.error("Error updating cart:", error);
        }
    }

    alert("Product added to cart successfully!");
    window.location.href = "cart.html";
}

async function loadProduct() {
    if (!productId) {
        console.error("Product ID not found in URL.");
        return;
    }

    const productDocRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productDocRef);

    if (productSnapshot.exists()) {
        const productData = productSnapshot.data();
        document.getElementById("productName").textContent = productData.name;
        document.getElementById("productPrice").textContent = `Rp ${productData.price.toLocaleString("id-ID")}`;
        document.getElementById("productDescription").textContent = productData.description;
        document.getElementById("productImage").src = productData.imageUrl;

        document.getElementById("addToCartBtn").addEventListener("click", () => addToCart({ id: productId, ...productData }));
    } else {
        console.log("No such product found!");
    }
}

// Initialize authentication state and load product details
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadProduct();
    } else {
        console.log("No user logged in.");
    }
});