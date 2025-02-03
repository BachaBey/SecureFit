// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAWtTTy56hwxe4dE4CJWEg1HwUI1KeQBjw",
    authDomain: "fit-fe30b.firebaseapp.com",
    databaseURL: "https://fit-fe30b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fit-fe30b",
    storageBucket: "fit-fe30b.firebasestorage.app",
    messagingSenderId: "563952602554",
    appId: "1:563952602554:web:789936db6f8e4a63f06183",
    measurementId: "G-RX2YG2457P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function listenForLockStatus() {
    const lockRef = ref(database,"LockState/State"); // Change to your actual path in the database
    
    onValue(lockRef, (snapshot) => {
        if (snapshot.exists()) {
        const status = snapshot.val();
        

        // Get the HTML element to update
        const state = document.getElementById("state");
        const lockImage = document.getElementById("lockImage");
        const lockButton = document.getElementById("lockButton");

        if (status === "locked") {
        
            state.innerText = "Locked";
            state.style.color = "green";

            lockImage.src = "../Images/lock-open.png";

            lockButton.style.backgroundColor = "rgb(18, 183, 18)";
            lockButton.innerHTML = "Unlock";
            
        } else if (status === "unlocked") {

            state.innerText = "Unlocked";
            state.style.color = "red";

            lockImage.src = "../Images/lock-closed.png";

            lockButton.style.backgroundColor = "red";
            lockButton.innerHTML = "Lock";
        }
        }
    });
}


const lockRef = ref(database,"LockState/State");
function toggleLock() {
    // Get current state from UI
    const currentState = document.getElementById("state").innerText.toLowerCase();
    const newStatus = currentState === "locked" ? "unlocked" : "locked";

    set(lockRef, newStatus)
    
}


document.addEventListener("DOMContentLoaded", () => {
    
    listenForLockStatus();
    const lockButton = document.getElementById("lockButton");
    lockButton.addEventListener("click", toggleLock);
});