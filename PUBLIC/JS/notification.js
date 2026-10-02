// ==========================================
// SMART HERITAGE NOTIFICATION
// ==========================================

function showHeritageNotification(placeName, distance) {

    if (!("Notification" in window)) {
        alert("You are near " + placeName + "!");
        return;
    }

    if (Notification.permission === "granted") {

        new Notification("🏛️ GeoHistory Alert", {
            body: "You are " + distance + " km away from " + placeName + ". Explore this heritage place!",
            icon: "../images/heritage-bg.jpg.jpg"
        });

    } else if (Notification.permission !== "denied") {

        Notification.requestPermission().then(function (permission) {

            if (permission === "granted") {

                new Notification("🏛️ GeoHistory Alert", {
                    body: "You are near " + placeName + "! Explore this heritage place.",
                    icon: "../images/heritage-bg.jpg.jpg"
                });

            }

        });

    }
}
function enableNotifications() {

    if (!("Notification" in window)) {

        alert("This browser does not support notifications.");

        return;
    }

    Notification.requestPermission().then(function(permission) {

        if (permission === "granted") {

            alert("Smart Notifications enabled successfully!");

        } 
        else if (permission === "denied") {

            alert("Notification permission was denied.");

        }

    });
}
function enableNotifications() {
    alert("Enable Smart Notifications button is working!");
}
function enableNotifications() {
    alert("Button is working");
}