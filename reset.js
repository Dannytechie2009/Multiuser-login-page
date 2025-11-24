import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA01PINAPFRjgmDoJWvOE2UvSYNJJlKewo",
  authDomain: "mysignup-system.firebaseapp.com",
  projectId: "mysignup-system",
  storageBucket: "mysignup-system.firebasestorage.app",
  messagingSenderId: "559901246306",
  appId: "1:559901246306:web:0d47604f7502ac72dda23b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("resetForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("resetEmail").value;

  try {
    await sendPasswordResetEmail(auth, email);
    document.getElementById("resetMsg").innerText = 
      "Reset link sent! Check your email.";
  } catch (err) {
    document.getElementById("resetMsg").innerText = err.message;
  }
});