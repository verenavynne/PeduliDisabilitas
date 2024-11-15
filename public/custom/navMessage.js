import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    updateDoc, 
    arrayUnion, 
    onSnapshot, 
    collection,      
    query,           
    getDocs         
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("message").addEventListener("click", (event) => {
            event.preventDefault();
            // Redirect to chat page with view parameter for history
            window.location.href = `chat.html?view=history`;
        });
    } else {
        console.error("User not signed in.");
        alert("Please log in to view your messages.");
    }
});

document.getElementById("message").addEventListener("click", async (event) => {
    event.preventDefault();
    const user = auth.currentUser;

    if (user) {
        // For chat history, pass only the 'view' parameter
        window.location.href = `chat.html?view=history`;
    } else {
        alert("Please log in to view your messages.");
    }
});

