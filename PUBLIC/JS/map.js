// ===============================
// HERITAGE MAP
// ===============================

// Create map
const map = L.map("map").setView(
    [18.921984, 72.834654],
    13
);


// OpenStreetMap
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


// Heritage locations
const heritagePlaces = [

    {
        name: "Gateway of India",
        lat: 18.921984,
        lng: 72.834654,
        description: "Historic monument in Mumbai."
    },

    {
        name: "CSMT",
        lat: 18.9402,
        lng: 72.8356,
        description: "Chhatrapati Shivaji Maharaj Terminus."
    },

    {
        name: "Elephanta Caves",
        lat: 18.9633,
        lng: 72.9315,
        description: "Historic rock-cut caves near Mumbai."
    }

];


// Add markers
heritagePlaces.forEach(function(place) {

    const marker = L.marker([
        place.lat,
        place.lng
    ]).addTo(map);


    marker.bindPopup(`
        <h3>${place.name}</h3>

        <p>${place.description}</p>

        <button onclick="openPlace('${place.name}')">
            View Details
        </button>
    `);

});


// Open place details
function openPlace(placeName) {

    window.location.href =
        "place-details.html?place=" +
        encodeURIComponent(placeName);

}