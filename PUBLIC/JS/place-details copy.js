
// ==========================================
// HERITAGE PLACE DATA
// ==========================================

const places = {

    gateway: {
        name: "Gateway of India",

        image: "../images/gateway.jpg",

        description:
            "A famous historical monument located in Mumbai.",

        history:
            "The Gateway of India is a historic monument and one of the most recognised landmarks of Mumbai.",

        location:
            "Mumbai, Maharashtra",

        fee:
            "Free",

        hours:
            "Open 24 Hours",

        category:
            "Historical Monument",

        audio:
            "../audio/gateway.mp3",

        gallery: [
            "../images/gateway.jpg",
            "../images/gateway2.jpg",
            "../images/gateway3.jpg",
            "../images/gateway4.jpg"
        ],

        extra:
            "The Gateway of India is an important historical and architectural landmark of Mumbai."
    },


    csmt: {
        name:
            "Chhatrapati Shivaji Maharaj Terminus",

        image:
            "../images/csmt.jpg",

        description:
            "A historic railway terminus and an important heritage landmark in Mumbai.",

        history:
            "Chhatrapati Shivaji Maharaj Terminus is a historic railway station famous for its Victorian Gothic architecture and cultural importance.",

        location:
            "Mumbai, Maharashtra",

        fee:
            "Free",

        hours:
            "Open 24 Hours",

        category:
            "Railway Heritage",

        audio:
            "../audio/csmt.mp3",

        gallery: [
            "../images/csmt.jpg",
            "../images/csmt2.jpg",
            "../images/csmt3.jpg",
            "../images/csmt4.jpg"
        ],

        extra:
            "CSMT is one of Mumbai's important heritage landmarks and is known for its historic architecture and railway heritage."
    },


    elephanta: {
        name:
            "Elephanta Caves",

        image:
            "../images/Elephanta.jpg",

        description:
            "Ancient rock-cut caves located on Elephanta Island near Mumbai.",

        history:
            "The Elephanta Caves are famous for their ancient rock-cut architecture, sculptures and cultural significance.",

        location:
            "Elephanta Island, Maharashtra",

        fee:
            "Entry fee applicable",

        hours:
            "9:30 AM - 5:30 PM",

        category:
            "Ancient Caves",

        audio:
            "../audio/elephanta.mp3",

        gallery: [
            "../images/elephanta.jpg",
            "../images/elephanta2.jpg",
            "../images/elephanta3.jpg",
            "../images/elephanta4.jpg"
        ],

        extra:
            "The Elephanta Caves are an important heritage destination known for their rock-cut architecture, sculptures and cultural significance."
    }

};


// ==========================================
// GET PLACE ID FROM URL
// ==========================================

const urlParams =
    new URLSearchParams(window.location.search);

const placeId =
    urlParams.get("place");


// ==========================================
// FIND PLACE DATA
// ==========================================

const data =
    places[placeId];


// ==========================================
// LOAD PLACE DETAILS
// ==========================================

if (data) {

    const placeName =
        document.getElementById("placeName");

    const placeDescription =
        document.getElementById("placeDescription");

    const placeHistory =
        document.getElementById("placeHistory");

    const placeLocation =
        document.getElementById("placeLocation");

    const entryFee =
        document.getElementById("entryFee");

    const visitingHours =
        document.getElementById("visitingHours");

    const category =
        document.getElementById("category");

    const extraInfo =
        document.getElementById("extraInfo");

    const placeImage =
        document.getElementById("placeImage");


    if (placeName) {
        placeName.textContent =
            data.name;
    }

    if (placeDescription) {
        placeDescription.textContent =
            data.description;
    }

    if (placeHistory) {
        placeHistory.textContent =
            data.history;
    }

    if (placeLocation) {
        placeLocation.textContent =
            data.location;
    }

    if (entryFee) {
        entryFee.textContent =
            data.fee;
    }

    if (visitingHours) {
        visitingHours.textContent =
            data.hours;
    }

    if (category) {
        category.textContent =
            data.category;
    }

    if (extraInfo) {
        extraInfo.textContent =
            data.extra;
    }

    if (placeImage) {
        placeImage.src =
            data.image;
    }


    // ======================================
    // LOAD PHOTO GALLERY
    // ======================================

    const galleryContainer =
        document.querySelector(".gallery-container");

    if (
        galleryContainer &&
        data.gallery
    ) {

        galleryContainer.innerHTML = "";

        data.gallery.forEach(function(image) {

            const img =
                document.createElement("img");

            img.src =
                image;

            img.alt =
                data.name;

            img.onclick =
                function() {
                    changeMainImage(image);
                };

            galleryContainer.appendChild(img);

        });
    }

}


// ==========================================
// IF PLACE NOT FOUND
// ==========================================

else {

    console.error(
        "Place not found:",
        placeId
    );

}


// ==========================================
// CHANGE MAIN IMAGE
// ==========================================

function changeMainImage(imageSource) {

    const mainImage =
        document.getElementById("placeImage");

    if (mainImage) {

        mainImage.src =
            imageSource;

    }

}


// ==========================================
// OPEN MAP
// ==========================================

function openMap() {

    if (!data) {

        alert("Place information not found.");

        return;
    }

    const locations = {

        gateway:
            "Gateway of India, Mumbai, Maharashtra",

        csmt:
            "Chhatrapati Shivaji Maharaj Terminus, Mumbai, Maharashtra",

        elephanta:
            "Elephanta Caves, Maharashtra"

    };

    const location =
        locations[placeId];

    if (!location) {

        alert("Location not found.");

        return;
    }

    const mapURL =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(location);

    window.open(
        mapURL,
        "_blank"
    );
}


// ==========================================
// AUDIO GUIDE
// ==========================================

let currentAudio = null;


function playAudio() {

    if (!data) {

        alert(
            "Place information not found."
        );

        return;
    }


    if (!data.audio) {

        alert(
            "Audio guide is not available."
        );

        return;
    }


    if (currentAudio) {

        currentAudio.pause();

        currentAudio.currentTime = 0;
    }


    currentAudio =
        new Audio(data.audio);


    currentAudio.play()
        .then(function() {

            console.log(
                "Audio Guide Started"
            );

        })
        .catch(function(error) {

            console.error(
                "Audio Error:",
                error
            );

            alert(
                "Audio play nahi ho raha. Audio filename aur location check karein."
            );

        });

}


// ==========================================
// SAVE PLACE
// ==========================================

function savePlace() {

    if (!data) {

        alert(
            "Place information not found."
        );

        return;
    }


    const placeName =
        data.name;


    let savedPlaces =
        JSON.parse(
            localStorage.getItem(
                "savedPlaces"
            )
        ) || [];


    if (
        savedPlaces.includes(placeName)
    ) {

        alert(
            "This place is already saved."
        );

        return;
    }


    savedPlaces.push(
        placeName
    );


    localStorage.setItem(
        "savedPlaces",
        JSON.stringify(savedPlaces)
    );


    alert(
        placeName +
        " has been saved to your favorites."
    );

}


// ==========================================
// BACK TO PLACES
// ==========================================

function goBackToPlaces() {

    window.location.href =
        "places.html";

}
// ==========================================
// DETECT CURRENT LOCATION
// ==========================================

function detectLocation() {
    

    const result =
        document.getElementById("locationResult");

    if (!navigator.geolocation) {

        result.textContent =
            "GPS is not supported by this browser.";

        return;
    }

    result.textContent =
        "Detecting your location...";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const userLatitude =
                position.coords.latitude;

            const userLongitude =
                position.coords.longitude;


            const distance =
    calculateDistance(
        userLatitude,
        userLongitude,
        data.latitude,
        data.longitude
    );


let distanceText;

if (distance >= 1000) {

    distanceText =
        (distance / 1000).toFixed(2) +
        " km";

} else {

    distanceText =
        Math.round(distance) +
        " meters";

}


result.innerHTML =

    "📍 Location detected successfully.<br><br>" +

    "Latitude: " +
    userLatitude.toFixed(6) +

    "<br>" +

    "Longitude: " +
    userLongitude.toFixed(6) +

    "<br><br>" +

    "🏛️ " +
    data.name +

    "<br>" +

    "📏 Distance: " +
    distanceText;
        },

        function(error) {

            if (error.code === 1) {

                result.textContent =
                    "Location permission was denied.";

            } else if (error.code === 2) {

                result.textContent =
                    "Location is currently unavailable.";

            } else if (error.code === 3) {

                result.textContent =
                    "Location request timed out.";

            } else {

                result.textContent =
                    "Unable to detect your location.";

            }

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}
// ==========================================
// CALCULATE DISTANCE BETWEEN TWO LOCATIONS
// ==========================================

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const earthRadius = 6371000;

    const latDifference =
        (lat2 - lat1) *
        Math.PI / 180;

    const lonDifference =
        (lon2 - lon1) *
        Math.PI / 180;


    const a =
        Math.sin(latDifference / 2) *
        Math.sin(latDifference / 2) +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(lonDifference / 2) *
        Math.sin(lonDifference / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return earthRadius * c;
}
// ==========================================
// GEO-FENCING
// ==========================================

const geofenceRadius = 500;


if (distance <= geofenceRadius) {

    result.innerHTML +=
        "<br><br>" +
        "🔔 <strong>You are near " +
        data.name +
        "!</strong><br>" +
        "This heritage place is within " +
        geofenceRadius +
        " meters of you.";

} else {

    result.innerHTML +=
        "<br><br>" +
        "ℹ️ You are outside the " +
        geofenceRadius +
        " meter heritage zone.";

}