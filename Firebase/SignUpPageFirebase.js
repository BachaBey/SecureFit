// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, onValue, set, get, update } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

function verifyData() {

    const emailInput = document.getElementById("emailInput").value;
    const phoneNumberInput = document.getElementById("phoneNumberInput").value;  

    if (emailInput!="" && phoneNumberInput.length==8) {
        return true;
    } else {
        return false;
    }

}

function updateDataInDatabase() {
    const emailInput = document.getElementById("emailInput").value;
    const phoneNumberInput = document.getElementById("phoneNumberInput").value;
    
    const updates = {
        "UserData/UserEmail":emailInput,
        "UserData/PhoneNumber":phoneNumberInput
    };

    return update(ref(database),updates);

} 

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("signUpButton");
    submitButton.addEventListener("click", () => {
        if (verifyData()) {
            updateDataInDatabase()
            .then(() => {
                window.location.href='../HomePage/Home.html';
            })
        } else {
            alert("Please fill all data correctly");
        }   
    })
})
