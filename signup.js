// ✅ Firebase imports
import { 
  initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { 
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  getFirestore,
  doc,
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA01PINAPFRjgmDoJWvOE2UvSYNJJlKewo",
  authDomain: "mysignup-system.firebaseapp.com",
  projectId: "mysignup-system",
  storageBucket: "mysignup-system.firebasestorage.app",
  messagingSenderId: "559901246306",
  appId: "1:559901246306:web:0d47604f7502ac72dda23b"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ----------------------------------------------
// ✅ SIGNUP HANDLER
// ----------------------------------------------
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect inputs
  const firstName = document.getElementById("firstName").value;
  const surname = document.getElementById("surname").value;
  const phone = document.getElementById("phone").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Create the user
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    // Send email verification
    await sendEmailVerification(user);

    // Auto-generated values
    const uid = user.uid;
    const joinDate = new Date().toLocaleDateString();
    const joinTime = new Date().toLocaleTimeString();
    const deviceType = /Mobi/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
    const browser = navigator.userAgent;

    // Country lookup
    const countryRes = await fetch("https://ipapi.co/country_name/");
    const country = await countryRes.text();

    // Save user data to Firestore
    await setDoc(doc(db, "users", uid), {
      firstName,
      surname,
      phone,
      gender,
      email,
      uid,
      role: "user",
      emailVerified: false,
      joinDate,
      joinTime,
      deviceType,
      browser,
      country,
      verified: false
    });

    document.getElementById("msg").innerText =
      "Signup successful — check your email to verify your account!";
      
  } catch (err) {
    document.getElementById("msg").innerText = err.message;
  }
});