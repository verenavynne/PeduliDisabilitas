import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

  const productsCollection = collection(db, "products");

  document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const imageUrl = document.getElementById("productImage").value;
    const description = document.getElementById("productDescription").value;

    try {
        const docRef = await addDoc(productsCollection, {
            name: name,
            price: price,
            imageUrl: imageUrl,
            description: description
        });
        console.log("Product added with ID:", docRef.id); // This is the Firestore-generated ID
        alert("Product added successfully!");
        document.getElementById("productForm").reset();
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
    }
});