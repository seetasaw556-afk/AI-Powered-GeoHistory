document.addEventListener("DOMContentLoaded", function () {

    const container =
        document.getElementById("placesContainer") ||
        document.getElementById("places-container") ||
        document.querySelector(".places-container") ||
        document.querySelector(".places-grid") ||
        document.querySelector(".places") ||
        document.querySelector(".heritage-container");
    if (!container) {
        console.error("Heritage places container not found.");
        return;
    }
    // Load heritage places from database
    fetch("/api/places")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Failed to load heritage places");
            }
            return response.json();
        })
        .then(function (places) {
            console.log("Heritage places loaded:", places);

            // Remove old hard-coded cards
            container.innerHTML = "";
            if (!places || places.length === 0) {
                container.innerHTML =
                    "<p>No heritage places available.</p>";
                return;
            }
            // Create cards
            places.forEach(function (place) {
                const card =
                    document.createElement("div");
                card.className = "heritage-card";
                // ------------------------------------------
                // SELECT IMAGE
                // ------------------------------------------
                let image =
                    "../images/heritage-bg.jpg.jpg";
                const placeName =
                    (place.name || "").toLowerCase();
                if (placeName.includes("gateway")) {
                    image = "../images/gateway.jpg";
                }
                else if (
                    placeName.includes("terminus") ||
                    placeName.includes("csmt") ||
                    placeName.includes("shivaji")
                ) {
                    image = "../images/csmt3.jpg";
                }
                else if (
                    placeName.includes("elephanta")
                ) {
                    image = "../images/elephanta.jpg";
                }
                // ------------------------------------------
                // CREATE CARD
                // ------------------------------------------
                const imageBox =
                    document.createElement("div");
                imageBox.className =
                    "heritage-image";
                const img = document.createElement("img");
                img.src = image;
                img.alt =
                    place.name || "Heritage Place";
                img.className =
                    "place-image";
                img.onerror = function () {
                    this.src =
                        "../images/heritage-bg.jpg.jpg";
                };
                imageBox.appendChild(img);
                // ------------------------------------------
                // CARD TITLE
                // ------------------------------------------
                const title =
                    document.createElement("h3");
                title.textContent =
                    place.name || "Heritage Place";
                // ------------------------------------------
                // DESCRIPTION
                // ------------------------------------------
                const description =
                    document.createElement("p");
                description.textContent =
                    place.description ||
                    "Explore this historical heritage place.";
                // ------------------------------------------
                // LOCATION
                // ------------------------------------------
                const location =
                    document.createElement("p");
                location.innerHTML =
                    "<strong>Location:</strong> " +
                    (
                        place.location ||
                        "Mumbai, Maharashtra"
                    );
                // ------------------------------------------
                // VIEW DETAILS BUTTON
                // ------------------------------------------
                const button =
                    document.createElement("button");
                button.className =
                    "view-details-btn";
                button.textContent =
                    "View Details";
                // IMPORTANT:
                // Save selected place and open details page
                button.addEventListener(
                    "click",
                    function () {
                        console.log(
                            "Selected place:",
                            place
                        );
                        // Save selected place
                        localStorage.setItem(
                            "selectedHeritagePlace",
                            JSON.stringify(place)
                        );
                        // Open details page
                        window.location.href =
                            "place-details.html";
                    }
                );
                // ------------------------------------------
                // ADD EVERYTHING TO CARD
                // ------------------------------------------
                card.appendChild(imageBox);
                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(location);
                card.appendChild(button);
                // Add card to container
                container.appendChild(card);
            });
        })
        .catch(function (error) {

            console.error(
                "Heritage places error:",
                error
            );
            container.innerHTML =
                "<p>Unable to load heritage places.</p>";
        });
});