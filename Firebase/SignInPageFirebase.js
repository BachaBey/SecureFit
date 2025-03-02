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



async function findUserIdByPhone(phoneNumber) {
    const dbRef = ref(database, "BuyingSide"); // Reference to BuyingSide
  
    try {
      const snapshot = await get(dbRef);
  
      if (snapshot.exists()) {
        const data = snapshot.val();
  
        for (const userId in data) {
          if (data[userId].UserData?.PhoneNumber === phoneNumber) {
            return userId;
          }
        }
      }

      return null;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
}


function verifylogIn() {
    const emailInput = document.getElementById("emailInput").value;
    const phoneNumberInput = "+216"+document.getElementById("phoneNumberInput").value;
    findUserIdByPhone(phoneNumberInput).then((userId) => {
        if (userId) {
            const dbRef = ref(database, "BuyingSide/" + userId+"/UserData");
            
            get(dbRef).then(snapshot => {
                if (snapshot.exists()) {
                    console.log(dbRef);
                    const data = snapshot.val();
                    if (data.UserEmail === emailInput) {
                        localStorage.setItem("userID", userId);
                        window.location.href='../HomePage/Home.html';
                    } else {
                        alert("verify data or signup");
                    }
                }
            })


        } else {
            alert("verify data or signup");
        }
    })
}


document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", () => {
        verifylogIn();
    });
})
