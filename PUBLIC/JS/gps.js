// ==========================================
// GPS + DISTANCE + SMART NOTIFICATION
// ==========================================

let notifiedPlaces = [];

// Heritage places
const heritagePlaces = [
    {
        name: "Gateway of India",
        latitude: 18.9220,
        longitude: 72.8347
    },
    {
        name: "Chhatrapati Shivaji Maharaj Terminus",
        latitude: 18.9402,
        longitude: 72.8356
    },
    {
        name: "Elephanta Caves",
        latitude: 18.9633,
        longitude: 72.9315
    }
];

// Calculate distance between two locations
function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}


// Detect current location
function detectLocation() {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;

            console.log("Your Latitude:", userLatitude);
            console.log("Your Longitude:", userLongitude);

            checkNearbyHeritage(
                userLatitude,
                userLongitude
            );
        },

        function(error) {

    console.error("Location Error:", error);

    if (error.code === 1) {
        alert("Location permission denied. Please allow location permission for this website.");
    }
    else if (error.code === 2) {
        alert("Location information is unavailable. Please turn on your device location/GPS.");
    }
    else if (error.code === 3) {
        alert("Location request timed out. Please try again.");
    }
    else {
        alert("Unable to detect your location.");
    }
}
    );
}


// ==========================================
// CHECK NEARBY HERITAGE PLACES
// ==========================================

function checkNearbyHeritage(userLatitude, userLongitude) {

    console.log("Checking heritage places...");

    heritagePlaces.forEach(function(place) {

        const distance = calculateDistance(
            userLatitude,
            userLongitude,
            place.latitude,
            place.longitude
        );

        console.log(
            place.name + " = " + distance.toFixed(2) + " km"
        );

        // TEST: Show distance on screen
        alert(
            place.name +
            " is " +
            distance.toFixed(2) +
            " km away from your location."
        );

        // Smart notification within 200 km
        if (distance <= 200) {

            if (!notifiedPlaces.includes(place.name)) {

                notifiedPlaces.push(place.name);

                showHeritageNotification(
                    place.name,
                    distance.toFixed(2)
                );
            }
        }
    });
}

// Smart Notification
function showHeritageNotification(placeName, distance) {

    if (!("Notification" in window)) {

        alert(
            "You are " +
            distance +
            " km away from " +
            placeName +
            "!"
        );

        return;
    }

    if (Notification.permission === "granted") {

        new Notification("🏛️ GeoHistory Alert", {

            body:
                "You are " +
                distance +
                " km away from " +
                placeName +
                ". Explore this heritage place!",

            icon: "../images/heritage-bg.jpg.jpg"
        });

    } else if (Notification.permission !== "denied") {

        Notification.requestPermission().then(function(permission) {

            if (permission === "granted") {

                new Notification("🏛️ GeoHistory Alert", {

                    body:
                        "You are near " +
                        placeName +
                        "! Explore this heritage place.",

                    icon: "../images/heritage-bg.jpg.jpg"
                });
            }

        });
    }
}