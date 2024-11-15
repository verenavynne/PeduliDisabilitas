
const navbarMenu= document.querySelector('.Menu');

document.querySelector('#hamburger').onclick = ()=>{
    navbarMenu.classList.toggle('active')
}

const hamburger = document.querySelector('#hamburger');

document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target)&& !navbarMenu.contains(e.target)){
        navbarMenu.classList.remove('active');
    }
})

document.querySelectorAll('.Menu a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

document.querySelectorAll('.hero a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Function to redirect to chat page with specific chatID
function goToChat(chatID, sellerID) {
    window.location.href = `chat.html?chatID=${chatID}&sellerID=${sellerID}`;
}

  async function displayProducts() {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = ""; // Clear any existing content

    try {
        const querySnapshot = await getDocs(productsCollection);
        querySnapshot.forEach((doc) => {
            const productData = doc.data();
            productData.id = doc.id; // Add the Firestore document ID to the product data

            // Use createProductCard to generate each product card and append it to productGrid
            const productCard = createProductCard(productData);
            productGrid.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

displayProducts();



function createProductCard(product) {
    const card = document.createElement("a");
    card.classList.add("product-card");
    card.href = `../views/productdesc.html?id=${product.id}`;

    const cardImg = document.createElement("div");
    cardImg.classList.add("card-img");
    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.name;
    cardImg.appendChild(img);

    const cardTxt = document.createElement("div");
    cardTxt.classList.add("card-txt");

    const title = document.createElement("h4");
    title.textContent = product.name;

    const price = document.createElement("h5");
    price.textContent = `Rp ${product.price.toLocaleString("id-ID")}`;

    const rating = document.createElement("p");
    rating.textContent = `⭐ 4.5 • 8 sold`;

    cardTxt.appendChild(title);
    cardTxt.appendChild(price);
    cardTxt.appendChild(rating);

    card.appendChild(cardImg);
    card.appendChild(cardTxt);
 
    return card;
}








