// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase, ref, onValue, get } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

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

function getDateShown() {
    const dates = document.querySelectorAll(".date");
    dates.forEach(day => {
        day.addEventListener("click", () => {
            const selectedDay = day.id;

            const bikerMetricsRef = ref(database,`BikerMetrics/${selectedDay}`); // Change to your actual path in the database
            const bikerWeightRef = ref(database,`UserData/BodyWeight`);

            onValue(bikerMetricsRef, async (snapshot) => {
                const timeOutput = document.getElementById("timeOutput");
                const caloriesOutput = document.getElementById("caloriesOutput");
                const distanceOutput = document.getElementById("distanceOutput");
                const carbonOutput = document.getElementById("carbonOutput");

                if (snapshot.exists()) {
                    const metrics = snapshot.val();

                    // Get biker weight
                    const weightSnapshot = await get(bikerWeightRef);

                    const weight = weightSnapshot.val(); // Assuming weight is stored as { weight: 70 }
                    const MET = 8; // Default MET value for cycling
                    const durationHours = metrics.TotalTime / 60; // Convert minutes to hours

                    // Calculate calories burned
                    const caloriesBurned = MET * weight * durationHours;

                    //Calculate Carbon emission saved
                    const emissionFactor = 0.21; //for a car
                    const distance = metrics.TotalDistance;
                    const carbonSaved = distance * 35.274 * emissionFactor;

                    // Update UI
                    timeOutput.innerHTML = metrics.TotalTime + " min";
                    caloriesOutput.innerHTML = caloriesBurned.toFixed(2) + " cal";
                    distanceOutput.innerHTML = metrics.TotalDistance + " km";
                    carbonOutput.innerHTML = carbonSaved.toFixed(2) + " oZ";

                } else {
                    timeOutput.innerHTML = "No Data";
                    caloriesOutput.innerHTML = "No Data";
                    distanceOutput.innerHTML = "No Data";
                    carbonOutput.innerHTML = "No Data";
                }
            }); 
        });
        
    });
}

function loadPageData() {
    const selectedDay = document.querySelector(".date.selected").id;
    const bikerMetricsRef = ref(database,`BikerMetrics/${selectedDay}`); // Change to your actual path in the database
    const bikerWeightRef = ref(database,`UserData/BodyWeight`);

    onValue(bikerMetricsRef, async (snapshot) => {
        const timeOutput = document.getElementById("timeOutput");
        const caloriesOutput = document.getElementById("caloriesOutput");
        const distanceOutput = document.getElementById("distanceOutput");
        const carbonOutput = document.getElementById("carbonOutput");

        if (snapshot.exists()) {
            const metrics = snapshot.val();

            // Get biker weight
            const weightSnapshot = await get(bikerWeightRef);

            const weight = weightSnapshot.val(); // Assuming weight is stored as { weight: 70 }
            const MET = 8; // Default MET value for cycling
            const durationHours = metrics.TotalTime / 60; // Convert minutes to hours

            // Calculate calories burned
            const caloriesBurned = MET * weight * durationHours;

            //Calculate Carbon emission saved
            const emissionFactor = 0.21; //for a car
            const distance = metrics.TotalDistance;
            const carbonSaved = distance * 35.274 * emissionFactor;

            // Update UI
            timeOutput.innerHTML = metrics.TotalTime + " min";
            caloriesOutput.innerHTML = caloriesBurned.toFixed(2) + " cal";
            distanceOutput.innerHTML = metrics.TotalDistance + " km";
            carbonOutput.innerHTML = carbonSaved.toFixed(2) + " oZ";

        } else {
            timeOutput.innerHTML = "No Data";
            caloriesOutput.innerHTML = "No Data";
            distanceOutput.innerHTML = "No Data";
            carbonOutput.innerHTML = "No Data";
        }
    });
}



document.addEventListener("DOMContentLoaded", () => {
    loadPageData();
    getDateShown();
});

