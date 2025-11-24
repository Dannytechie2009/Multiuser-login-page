import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, collection, getDocs, deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

let userList = [];

async function loadUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  userList = [];
  
  querySnapshot.forEach((docu) => {
    let data = docu.data();
    userList.push(data);
  });

  displayUsers(userList);
}

/* ================================
   DISPLAY TABLE
================================ */
function displayUsers(list) {
  let tableBody = document.querySelector("#userTable tbody");
  tableBody.innerHTML = "";

  list.forEach((data) => {
    let row = `
      <tr>
        <td>${data.firstName} ${data.surname}</td>
        <td>${data.phone}</td>
        <td>${data.email}</td>
        <td>${data.gender}</td>
        <td>${data.country}</td>
        <td>${data.joinDate} ${data.joinTime}</td>
        <td><button class="action-btn" onclick="deleteUser('${data.uid}')">Delete</button></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

/* =================================
   DELETE USER (with confirmation)
================================= */
window.deleteUser = async function(uid) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  await deleteDoc(doc(db, "users", uid));

  alert("User deleted!");
  loadUsers();
};

/* =================================
   SEARCH FILTER
================================= */
document.getElementById("search").addEventListener("keyup", () => {
  let text = document.getElementById("search").value.toLowerCase();
  let filtered = userList.filter(u =>
    u.firstName.toLowerCase().includes(text) ||
    u.surname.toLowerCase().includes(text) ||
    u.email.toLowerCase().includes(text)
  );
  displayUsers(filtered);
});

/* =================================
   SORTING
================================= */
document.querySelectorAll("th[data-sort]").forEach(header => {
  header.addEventListener("click", () => {
    let field = header.getAttribute("data-sort");

    userList.sort((a, b) => {
      let fa = (a[field] || "").toString().toLowerCase();
      let fb = (b[field] || "").toString().toLowerCase();
      return fa.localeCompare(fb);
    });

    displayUsers(userList);
  });
});

/* =================================
   EXPORT TO CSV
================================= */
document.getElementById("exportCSV").addEventListener("click", () => {
  let csv = "Name,Phone,Email,Gender,Country,Join Date\n";

  userList.forEach(u => {
    csv += `${u.firstName} ${u.surname},${u.phone},${u.email},${u.gender},${u.country},${u.joinDate}\n`;
  });

  let blob = new Blob([csv], { type: "text/csv" });
  let url = URL.createObjectURL(blob);

  let link = document.createElement("a");
  link.href = url;
  link.download = "users.csv";
  link.click();
});

/* LOAD USERS */
loadUsers();