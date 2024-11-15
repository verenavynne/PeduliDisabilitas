import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getFirestore, collection, query, where, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

let currentUser;
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        loadProduct();
    } else {
        console.log("No user is signed in.");
    }
});

async function startChat(sellerID) {
    if (currentUser) {
        const chatID = await getOrCreateChat(currentUser.uid, sellerID);
        window.location.href = `chat.html?chatID=${chatID}&sellerID=${sellerID}`;
    } else {
        alert("Please log in to start a chat.");
    }
}

async function getOrCreateChat(buyerID, sellerID) {
    const chatsRef = collection(db, "chats");
    const chatQuery = query(chatsRef, where("participants", "array-contains", buyerID));
    const querySnapshot = await getDocs(chatQuery);
    let existingChatID = null;

    querySnapshot.forEach((doc) => {
        const chatData = doc.data();
        if (chatData.participants.includes(sellerID)) {
            existingChatID = doc.id;
        }
    });

    if (existingChatID) {
        return existingChatID;
    } else {
        const newChatDoc = await addDoc(chatsRef, {
            participants: [buyerID, sellerID],
            messages: []
        });
        return newChatDoc.id;
    }
}

async function addToCart(product) {
    const user = auth.currentUser;
    if (!user) {
        alert("Please log in to add items to your cart.");
        return;
    }

    const cartDocRef = doc(db, "carts", user.uid);

    try {
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
        
        const sellerID = productData.creatorID; 

        // Add event listener to Chat Seller button, passing the sellerID
        const chatSellerButton = document.getElementById("chatSeller");
        if (chatSellerButton) {
            chatSellerButton.addEventListener("click", () => startChat(sellerID));
        } else {
            console.error("Chat Seller button not found");
        }
    } else {
        console.log("No such product found!");
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        loadProduct();
    } else {
        console.log("No user logged in.");
    }
});