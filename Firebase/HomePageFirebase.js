// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, onValue, set, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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
    const userID = localStorage.getItem("userID");
    const lockRef = ref(database,"BuyingSide/"+userID+"/BikeState/LockState/State"); // Change to your actual path in the database
    
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


function getFormattedDateTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}


const userID = localStorage.getItem("userID");
const lockRefState = ref(database,"BuyingSide/"+userID+"/BikeState/LockState/State");
const lockRefStateDate = ref(database,"BuyingSide/"+userID+"/BikeState/LockState/LastUpdated");
function toggleLock() {
    // Get current state from UI
    const currentState = document.getElementById("state").innerText.toLowerCase();
    const newStatus = currentState === "locked" ? "unlocked" : "locked";
    const newDate = getFormattedDateTime();

    set(lockRefState, newStatus);
    set(lockRefStateDate, newDate);
    
}


// Global variables
let map, marker;

// Initialize Google Maps
function initMap(lat, lng) {
    const location = { lat, lng };
    
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: location,
    });

    marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Bike Location",
    });

    // Open Google Maps on marker click
    marker.addListener("click", () => {
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    });

    // Click event to open Google Maps at clicked location
    map.addListener("click", (event) => {
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    });

    // Start listening for real-time location updates
    listenForLocationUpdates();
}

// Listen for location updates from Firebase
function listenForLocationUpdates() {
    const userID = localStorage.getItem("userID");
    const locationRef = ref(database, "BuyingSide/"+userID+"/BikeState/BikeLocation/Location"); // Adjust path if needed

    onValue(locationRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            let lat = Number(data.lat);
            let lng = Number(data.lng);

            // Update map marker and center position
            updateMap(lat, lng);
        }
    });
}

// Update the marker and center the map
function updateMap(lat, lng) {
    const newLocation = { lat, lng };
    map.setCenter(newLocation);
    marker.setPosition(newLocation);
}

function initFirebase() {
    const userID = localStorage.getItem("userID");
    const locationRef = ref(database, "BuyingSide/"+userID+"/BikeState/BikeLocation/Location");

    onValue(locationRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            initMap(Number(data.lat), Number(data.lng));
        } else {
            console.log("No initial location found");
        }
    });
}

window.initFirebase = initFirebase;

// Load Google Maps script dynamically
function loadMapScript() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initFirebase`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

function loadName() {
    const userID = localStorage.getItem("userID");
    const dataRef = ref(database, "BuyingSide/"+userID+"/UserData"); // Change path

    get(dataRef)
    .then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const name = document.getElementById("name");
            name.innerHTML = data.Name;
        }
    })

}

document.addEventListener("DOMContentLoaded", () => {
    loadName();

    loadMapScript();

    listenForLockStatus();
    const lockButton = document.getElementById("lockButton");
    lockButton.addEventListener("click", toggleLock);

});