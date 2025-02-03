function initMap(lat, lng) {
    const location = { lat: lat, lng: lng };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: location,
    });

    // Add a marker at the given location
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Click to open in Google Maps",
    });

    // Event listener for clicking on the map
    map.addListener('click', function(event) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        // Open Google Maps in a new tab at the clicked location
        const googleMapsUrl = `https://www.google.com/maps?q=${clickedLat},${clickedLng}`;
        window.open(googleMapsUrl, '_blank');
    });
}

// Ensure script loads first, then call initMap() with custom coordinates
function loadMapScript() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=&callback=onGoogleMapsLoaded";
    script.async = true;
    document.body.appendChild(script);
}

// Callback when Google Maps API is loaded
function onGoogleMapsLoaded() {
    initMap(lat, lng); // Change this to any coordinates you want
}

    