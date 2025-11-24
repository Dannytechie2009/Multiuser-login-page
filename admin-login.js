import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword }
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

// YOUR ADMIN UID
const ADMIN_UID = "r4GyuXuzHiPE3oxivj3pIVUiOFL2";

document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    if (cred.user.uid !== ADMIN_UID) {
      document.getElementById("adminMsg").innerText = "Not authorized!";
      return;
    }

    window.location.href = "admin.html";
  } 
  catch (err) {
    document.getElementById("adminMsg").innerText = err.message;
  }
});