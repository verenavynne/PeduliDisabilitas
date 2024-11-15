import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
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
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function loadUserProfile() {
    const user = auth.currentUser;

    if (user) {
        // Access the "users" collection and get the document with the user's UID
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            // Get data from Firestore document
            const userData = userDoc.data();
            
            // Populate the HTML fields with user data
            document.getElementById("username").value = userData.username || "";
            document.getElementById("name").value = userData.name || "";
            document.getElementById("email").value = userData.email || "";
            document.getElementById("phone").value = userData.phone || "";
            document.getElementById("dob").value = userData.dob || "";
            document.getElementById("gender").value = userData.gender || "" 
            document.getElementById("password").value = userData.password || "";
            ;
        } else {
            console.log("No user document found!");
        }
    } else {
        console.log("User is not logged in");
    }
}

// Check if a user is authenticated, then load their profile data
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadUserProfile();
    } else {
        console.log("No user logged in");
    }
});

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