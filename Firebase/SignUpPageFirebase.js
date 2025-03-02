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
    const NameInput = document.getElementById("NameInput").value; 
    const LastNameNameInput = document.getElementById("LastNameInput").value;  
    const BodyWeightInput = document.getElementById("BodyWeightInput").value; 
    const phoneNumberInput = document.getElementById("phoneNumberInput").value;

    if (emailInput!="" && NameInput!="" && LastNameNameInput!="" && BodyWeightInput!="" &&phoneNumberInput.length==8 ) {
        return true;
    } else {
        return false;
    }

}

async function updateDataInDatabase() {
    const emailInput = document.getElementById("emailInput").value;
    const NameInput = document.getElementById("NameInput").value; 
    const LastNameNameInput = document.getElementById("LastNameInput").value;  
    const BodyWeightInput = document.getElementById("BodyWeightInput").value; 
    const phoneNumberInput = document.getElementById("phoneNumberInput").value;
    
    const updates = {
        "UserData/Email":emailInput,
        "UserData/Name":NameInput,
        "UserData/LastName":LastNameNameInput,
        "UserData/BodyWeight":BodyWeightInput,
        "UserData/PhoneNumber":"+216"+phoneNumberInput,
    };

    const generatedID = await generateNextID();;

    return update(ref(database, `BuyingSide/${generatedID}`), updates);

} 

async function generateNextID() {
    const dbRef = ref(database, "BuyingSide");

    return get(dbRef).then(snapshot => {
        if (snapshot.exists()) {
            const ids = Object.keys(snapshot.val());
            const lastID = ids.sort().pop();

            if (lastID) {
                const lastNumber = parseInt(lastID.substring(1));
                localStorage.setItem("userID", `B${lastNumber + 1}`);
                return `B${lastNumber + 1}`;
            }
        }
        localStorage.setItem("userID", "B1");
        return "B1"; // Default if no IDs exist
    })
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
