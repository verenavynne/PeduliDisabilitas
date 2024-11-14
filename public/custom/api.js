import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

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
const analytics = getAnalytics(app);