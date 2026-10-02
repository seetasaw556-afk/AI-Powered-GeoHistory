function exploreHeritage() {

    window.location.href = "pages/places.html";

}


function detectLocation() {

    if (!navigator.geolocation) {

        alert(
            "Geolocation is not supported by your browser."
        );

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            alert(
                "Your current location:\n\n" +
                "Latitude: " + latitude +
                "\nLongitude: " + longitude
            );

        },


        function(error) {

            alert(
                "Location permission was not provided."
            );

        }

    );

}


function viewPlace(placeName) {

    alert(
        "You selected: " +
        placeName +
        "\n\nDetailed heritage information will be available here."
    );

}
// ==========================================
// OPEN HERITAGE PLACE DETAILS
// ==========================================

function openPlace(placeId) {

    window.location.href =
        "place-details.html?place=" +
        encodeURIComponent(placeId);

}