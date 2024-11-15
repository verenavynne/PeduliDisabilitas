// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyDlnPImmvlGesXSzXqH-RLI4QyL2qVkKd0",
//     authDomain: "pedulidisabilitas-a8543.firebaseapp.com",
//     projectId: "pedulidisabilitas-a8543",
//     storageBucket: "pedulidisabilitas-a8543.appspot.com",
//     messagingSenderId: "422069751597",
//     appId: "1:422069751597:web:a69c60bea4000914090da4",
//     measurementId: "G-8PET8RYEF8"
//   };

//   const app = initializeApp(firebaseConfig);
//   const db = getFirestore();
//   const auth = getAuth();

//   const productsCollection = collection(db, "products");
//   const user = auth.currentUser;
//     if (!user) {
//     alert("Please log in to add a product.");
//     return;
//     }

//   document.getElementById("productForm").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const name = document.getElementById("productName").value;
//     const price = parseFloat(document.getElementById("productPrice").value);
//     const imageUrl = document.getElementById("productImage").value;
//     const description = document.getElementById("productDescription").value;

//     try {
//         await addDoc(collection(db, "products"), {
//             name: name,
//             price: price,
//             imageUrl: imageUrl,
//             description: description,
//             creatorID: user.uid,
//         });
//         console.log("Product added with ID:", docRef.id); // This is the Firestore-generated ID
//         alert("Product added successfully!");
//         document.getElementById("productForm").reset();
//     } catch (error) {
//         console.error("Error adding product:", error);
//         alert("Failed to add product. Please try again.");
//     }
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Initialize Firebase
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

let currentUser = null;

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("User logged in:", user);
    } else {
        currentUser = null;
        console.log("No user is logged in.");
    }
});

// Form submission event listener
document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Ensure the user is logged in before proceeding
    if (!currentUser) {
        alert("Please log in to add a product.");
        return;
    }

    // Get form values
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const imageUrl = document.getElementById("productImage").value;
    const description = document.getElementById("productDescription").value;

    try {
        // Add the product document to Firestore
        const docRef = await addDoc(collection(db, "products"), {
            name: name,
            price: price,
            imageUrl: imageUrl,
            description: description,
            creatorID: currentUser.uid,
        });
        console.log("Product added with ID:", docRef.id); // Firestore-generated ID
        alert("Product added successfully!");
        document.getElementById("productForm").reset();
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
    }
});