import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA01PINAPFRjgmDoJWvOE2UvSYNJJlKewo",
  authDomain: "mysignup-system.firebaseapp.com",
  projectId: "mysignup-system",
  storageBucket: "mysignup-system.firebasestorage.app",
  messagingSenderId: "559901246306",
  appId: "1:559901246306:web:0d47604f7502ac72dda23b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let users = [];

async function loadAnalytics() {
  const snap = await getDocs(collection(db, "users"));
  users = snap.docs.map(doc => doc.data());

  drawCharts();
}

function drawCharts() {

  // GENDER CHART
  let genderCount = {
    Male: users.filter(u => u.gender === "Male").length,
    Female: users.filter(u => u.gender === "Female").length
  };

  new Chart(document.getElementById("genderChart"), {
    type: "pie",
    data: {
      labels: ["Male", "Female"],
      datasets: [{
        data: [genderCount.Male, genderCount.Female]
      }]
    }
  });

  // COUNTRY CHART
  let countries = {};
  users.forEach(u => {
    countries[u.country] = (countries[u.country] || 0) + 1;
  });

  new Chart(document.getElementById("countryChart"), {
    type: "bar",
    data: {
      labels: Object.keys(countries),
      datasets: [{
        data: Object.values(countries)
      }]
    }
  });

  // DEVICE CHART
  let devices = {
    Mobile: users.filter(u => u.deviceType === "Mobile").length,
    Desktop: users.filter(u => u.deviceType === "Desktop").length
  };

  new Chart(document.getElementById("deviceChart"), {
    type: "doughnut",
    data: {
      labels: ["Mobile", "Desktop"],
      datasets: [{
        data: [devices.Mobile, devices.Desktop]
      }]
    }
  });
}

loadAnalytics();