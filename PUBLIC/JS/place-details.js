// ==========================================
// PLACE DETAILS PAGE
// ==========================================


let data = null;
let currentAudio = null;
const placeTranslations = {

    "Gateway of India": {
        hi: {
            description: "गेटवे ऑफ इंडिया मुंबई का एक प्रसिद्ध ऐतिहासिक स्मारक है।",
            history: "गेटवे ऑफ इंडिया का निर्माण ब्रिटिश शासन के समय किया गया था। यह मुंबई के प्रमुख पर्यटन स्थलों में से एक है।"
        },
        mr: {
            description: "गेटवे ऑफ इंडिया हे मुंबईतील एक प्रसिद्ध ऐतिहासिक स्मारक आहे.",
            history: "गेटवे ऑफ इंडियाचे बांधकाम ब्रिटिश राजवटीच्या काळात करण्यात आले. हे मुंबईतील प्रमुख पर्यटन स्थळांपैकी एक आहे."
        }
    },

    "Chhatrapati Shivaji Maharaj Terminus": {
        hi: {
            description: "छत्रपति शिवाजी महाराज टर्मिनस मुंबई का एक प्रसिद्ध ऐतिहासिक रेलवे स्टेशन है।",
            history: "इस ऐतिहासिक इमारत का निर्माण ब्रिटिश काल में हुआ था। इसकी वास्तुकला भारतीय और विक्टोरियन शैली का सुंदर मिश्रण है।"
        },
        mr: {
            description: "छत्रपती शिवाजी महाराज टर्मिनस हे मुंबईतील एक प्रसिद्ध ऐतिहासिक रेल्वे स्थानक आहे.",
            history: "या ऐतिहासिक इमारतीचे बांधकाम ब्रिटिश काळात झाले. तिच्या वास्तुकलेत भारतीय आणि व्हिक्टोरियन शैलीचे सुंदर मिश्रण आहे."
        }
    },

    "Elephanta Caves": {
        hi: {
            description: "एलिफेंटा गुफाएँ मुंबई के पास स्थित प्राचीन गुफाओं का एक प्रसिद्ध समूह है।",
            history: "एलिफेंटा गुफाएँ अपनी प्राचीन मूर्तियों और शैल-कट वास्तुकला के लिए प्रसिद्ध हैं।"
        },
        mr: {
            description: "एलिफंटा लेणी मुंबईजवळील प्राचीन लेण्यांचा एक प्रसिद्ध समूह आहे.",
            history: "एलिफंटा लेणी त्यांच्या प्राचीन शिल्पकला आणि दगडात कोरलेल्या वास्तुकलेसाठी प्रसिद्ध आहेत."
        }
    }
};
// ==========================================
// PLACE DETAILS TRANSLATIONS
// ==========================================

const detailTranslations = {

    en: {
        description: "Description",
        history: "History",
        location: "Location",
        entryFee: "Entry Fee",
        visitingHours: "Visiting Hours",
        category: "Category",
        extraInfo: "Extra Information",
        viewMap: "View on Map",
        audioGuide: "Audio Guide",
        savePlace: "Save Place"
    },

    hi: {
        description: "विवरण",
        history: "इतिहास",
        location: "स्थान",
        entryFee: "प्रवेश शुल्क",
        visitingHours: "भ्रमण का समय",
        category: "श्रेणी",
        extraInfo: "अतिरिक्त जानकारी",
        viewMap: "मानचित्र पर देखें",
        audioGuide: "ऑडियो गाइड",
        savePlace: "स्थान सेव करें"
    },

    mr: {
        description: "वर्णन",
        history: "इतिहास",
        location: "स्थान",
        entryFee: "प्रवेश शुल्क",
        visitingHours: "भेट देण्याची वेळ",
        category: "श्रेणी",
        extraInfo: "अतिरिक्त माहिती",
        viewMap: "नकाशावर पहा",
        audioGuide: "ऑडिओ मार्गदर्शक",
        savePlace: "स्थान जतन करा"
    }
};

// ==========================================
// LOAD SELECTED PLACE FROM LOCAL STORAGE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const savedPlace = localStorage.getItem("selectedHeritagePlace");

    if (!savedPlace) {
        console.error("No heritage place selected.");
        alert("Please select a heritage place first.");
        return;
    }

    try {
        data = JSON.parse(savedPlace);

        console.log("Selected place:", data);

        loadPlaceDetails();

    } catch (error) {
        console.error("Error reading selected place:", error);
        alert("Unable to load heritage place.");
    }

});


// ==========================================
// LOAD PLACE DETAILS
// ==========================================

function loadPlaceDetails() {

    if (!data) {
        return;
    }

    // Place name
    const name = document.getElementById("placeName");

    if (name) {
        name.textContent = data.name || "Heritage Place";
    }


    // Description
   // Description
const description =
    document.getElementById("placeDescription");

if (description) {

    const selectedLanguage =
        localStorage.getItem("selectedLanguage") || "en";

    if (
        selectedLanguage !== "en" &&
        placeTranslations[data.name] &&
        placeTranslations[data.name][selectedLanguage]
    ) {

        description.textContent =
            placeTranslations[data.name][selectedLanguage].description;

    } else {

        description.textContent =
            data.description ||
            "Explore this historical heritage place.";
    }
}


    // History
    // History
const history =
    document.getElementById("placeHistory");

if (history) {

    const selectedLanguage =
        localStorage.getItem("selectedLanguage") || "en";

    if (
        selectedLanguage !== "en" &&
        placeTranslations[data.name] &&
        placeTranslations[data.name][selectedLanguage]
    ) {

        history.textContent =
            placeTranslations[data.name][selectedLanguage].history;

    } else {

        history.textContent =
            data.history ||
            "Historical information is not available.";
    }
}

    // Location
  // Location
const location =
    document.getElementById("placeLocation");

if (location) {

    if (data.latitude && data.longitude) {

        location.textContent =
            "Latitude: " +
            data.latitude +
            ", Longitude: " +
            data.longitude;

    } else {

        location.textContent =
            data.location ||
            "Location not available";
    }
}

    // Entry Fee
    const fee =
        document.getElementById("entryFee");

    if (fee) {
        fee.textContent =
            data.entry_fee ||
            data.fee ||
            "Not available";
    }


    // Visiting Hours
    const hours =
        document.getElementById("visitingHours");

    if (hours) {
        hours.textContent =
            data.opening_hours ||
            data.hours ||
            "Not available";
    }


    // Category
    // Category
const category =
    document.getElementById("category");

if (category) {

    const selectedLanguage =
        localStorage.getItem("selectedLanguage") || "en";

    let categoryText =
        data.category ||
        "Heritage Place";

    if (selectedLanguage === "hi") {

        categoryText =
            "ऐतिहासिक विरासत स्थल";

    } else if (selectedLanguage === "mr") {

        categoryText =
            "ऐतिहासिक वारसा स्थळ";
    }

    category.textContent = categoryText;
}

    // Extra Information
    const extraInfo =
        document.getElementById("extraInfo");

    if (extraInfo) {

        extraInfo.textContent =
            data.history ||
            data.description ||
            "Discover the historical importance and cultural significance of this heritage location.";
    }


    // Main Image
    const placeImage =
        document.getElementById("placeImage");

    if (placeImage) {

        let imagePath =
            getMainImage(data);

        placeImage.src = imagePath;

        placeImage.alt =
            data.name || "Heritage Place";

        placeImage.onerror = function () {
            this.src = "../images/heritage-bg.jpg.jpg";
        };
    }


    // Load Gallery
    loadGallery();
}


// ==========================================
// GET MAIN IMAGE
// ==========================================

function getMainImage(place) {

    const name =
        (place.name || "").toLowerCase();


    // Gateway of India
    if (name.includes("gateway")) {

        return "../images/gateway.jpg";
    }


    // CSMT
    if (
        name.includes("terminus") ||
        name.includes("csmt") ||
        name.includes("shivaji")
    ) {

        return "../images/csmt3.jpg";
    }


    // Elephanta Caves
    if (name.includes("elephanta")) {

        return "../images/elephanta.jpg";
    }


    // If database image exists
    if (place.image) {

        let image =
            place.image.replace("../images/", "");

        return "../images/" + image;
    }


    // Default
    return "../images/heritage-bg.jpg.jpg";
}


// ==========================================
// PHOTO GALLERY
// ==========================================

function loadGallery() {

    const gallery =
        document.querySelector(".gallery-container");

    if (!gallery) {
        return;
    }

    gallery.innerHTML = "";


    const name =
        (data.name || "").toLowerCase();

    let images = [];


    // Gateway Gallery
    if (name.includes("gateway")) {

        images = [
            "../images/gateway.jpg",
            "../images/gateway2.jpg",
            "../images/gateway3.jpg",
            "../images/gateway4.jpg"
        ];
    }


    // CSMT Gallery
    else if (
        name.includes("terminus") ||
        name.includes("csmt") ||
        name.includes("shivaji")
    ) {

        images = [
            "../images/csmt3.jpg",
            "../images/csmt4.jpg"
        ];
    }


    // Elephanta Gallery
    else if (name.includes("elephanta")) {

        images = [
            "../images/elephanta.jpg",
            "../images/elephanta2.jpg",
            "../images/elephanta3.jpg",
            "../images/elephanta4.jpg"
        ];
    }


    // Create gallery images
    images.forEach(function (image) {

        const img =
            document.createElement("img");

        img.src = image;

        img.className =
            "gallery-image";

        img.alt =
            data.name || "Heritage Place";

        img.onerror = function () {
            this.style.display = "none";
        };


        // Click image to change main image
        img.addEventListener("click", function () {

            changeMainImage(image);

        });


        gallery.appendChild(img);
    });
}


// ==========================================
// CHANGE MAIN IMAGE
// ==========================================

function changeMainImage(image) {

    const mainImage =
        document.getElementById("placeImage");

    if (mainImage) {

        mainImage.src = image;

        mainImage.onerror = function () {
            this.src =
                "../images/heritage-bg.jpg.jpg";
        };
    }
}


// ==========================================
// VIEW ON MAP
// ==========================================

function openMap() {

    if (!data) {
        alert("Place information not available.");
        return;
    }


    const latitude =
        data.latitude;

    const longitude =
        data.longitude;


    if (!latitude || !longitude) {

        alert("Location coordinates are not available.");

        return;
    }


    window.location.href =
        "map.html?lat=" +
        encodeURIComponent(latitude) +
        "&lng=" +
        encodeURIComponent(longitude);
}


// ==========================================
// AUDIO GUIDE
// ==========================================

function playAudio() {

    if (!data) {
        alert("Place information not available.");
        return;
    }


    const name =
        (data.name || "").toLowerCase();

    let audioFile = "";


    if (name.includes("gateway")) {

        audioFile =
            "../audio/gateway.mp3";

    }

    else if (
        name.includes("terminus") ||
        name.includes("csmt") ||
        name.includes("shivaji")
    ) {

        audioFile =
            "../audio/csmt.mp3";

    }

    else if (name.includes("elephanta")) {

        audioFile =
            "../audio/elephanta.mp3";
    }


    if (!audioFile) {

        alert("Audio guide is not available for this place.");

        return;
    }


    // Stop previous audio
    if (currentAudio) {

        currentAudio.pause();
        currentAudio.currentTime = 0;
    }


    currentAudio =
        new Audio(audioFile);


    currentAudio.play()
        .then(function () {

            console.log("Audio Guide started.");

        })
        .catch(function (error) {

            console.error("Audio error:", error);

            alert(
                "Audio could not be played. Please check the audio file."
            );
        });
}


// ==========================================
// SAVE PLACE
// ==========================================

function savePlace() {

    if (!data) {

        alert("Place information not available.");

        return;
    }


    let savedPlaces =
        JSON.parse(
            localStorage.getItem("savedHeritagePlaces")
        ) || [];


    const alreadySaved =
        savedPlaces.some(function (place) {

            return place.id === data.id;

        });


    if (alreadySaved) {

        alert("This place is already saved.");

        return;
    }


    savedPlaces.push(data);


    localStorage.setItem(
        "savedHeritagePlaces",
        JSON.stringify(savedPlaces)
    );


    alert(
        data.name +
        " has been saved successfully."
    );
}


// ==========================================
// DETECT MY LOCATION
// ==========================================

function detectLocation() {

    const result =
        document.getElementById("locationResult");


    if (!result) {
        return;
    }


    if (!navigator.geolocation) {

        result.textContent =
            "Geolocation is not supported by your browser.";

        return;
    }


    result.textContent =
        "Detecting your location...";


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const userLatitude =
                position.coords.latitude;

            const userLongitude =
                position.coords.longitude;


            if (
                !data ||
                !data.latitude ||
                !data.longitude
            ) {

                result.textContent =
                    "Heritage place location is not available.";

                return;
            }


            const distance =
                calculateDistance(
                    userLatitude,
                    userLongitude,
                    Number(data.latitude),
                    Number(data.longitude)
                );


            result.innerHTML =
                "Your Location: " +
                userLatitude.toFixed(4) +
                ", " +
                userLongitude.toFixed(4) +
                "<br><br>" +

                "Distance from " +
                (data.name || "heritage place") +
                ": " +

                distance.toFixed(2) +
                " km";
        },


        function (error) {

            console.error(
                "Location error:",
                error
            );

            result.textContent =
                "Unable to detect your location. Please allow location permission.";
        }
    );
}


// ==========================================
// CALCULATE DISTANCE
// ==========================================

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371;


    const dLat =
        toRadians(lat2 - lat1);

    const dLon =
        toRadians(lon2 - lon1);


    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return R * c;
}


// ==========================================
// CONVERT DEGREES TO RADIANS
// ==========================================

function toRadians(degrees) {

    return degrees *
        (Math.PI / 180);
}
// ==========================================
// CHANGE LANGUAGE ON PLACE DETAILS PAGE
// ==========================================

function changePlaceDetailsLanguage() {

    const selector =
        document.getElementById("languageSelector");

    if (!selector) {
        return;
    }

    const language = selector.value;

    // Save selected language
    localStorage.setItem("selectedLanguage", language);

    const detailText =
        detailTranslations[language];

    if (!detailText) {
        return;
    }


    // ==========================================
    // ACTUAL PLACE INFORMATION
    // ==========================================

    if (
        data &&
        placeTranslations[data.name] &&
        language !== "en" &&
        placeTranslations[data.name][language]
    ) {

        const translatedPlace =
            placeTranslations[data.name][language];


        // Description
        const description =
            document.getElementById("placeDescription");

        if (description) {
            description.textContent =
                translatedPlace.description;
        }


        // History
        const history =
            document.getElementById("placeHistory");

        if (history) {
            history.textContent =
                translatedPlace.history;
        }


        // Location
        const location =
            document.getElementById("placeLocation");

        if (location) {

            if (data.latitude && data.longitude) {

                if (language === "hi") {

                    location.textContent =
                        "अक्षांश: " +
                        data.latitude +
                        ", देशांतर: " +
                        data.longitude;

                } else if (language === "mr") {

                    location.textContent =
                        "अक्षांश: " +
                        data.latitude +
                        ", रेखांश: " +
                        data.longitude;

                }

            } else {

                location.textContent =
                    data.location ||
                    "Location not available";
            }
        }


        // Entry Fee
        const fee =
            document.getElementById("entryFee");

        if (fee) {

            const feeValue =
                data.entry_fee ||
                data.fee ||
                "Not available";

            if (language === "hi") {

                if (
                    feeValue.toString().toLowerCase() ===
                    "free"
                ) {
                    fee.textContent = "निःशुल्क";
                } else {
                    fee.textContent = feeValue;
                }

            } else if (language === "mr") {

                if (
                    feeValue.toString().toLowerCase() ===
                    "free"
                ) {
                    fee.textContent = "मोफत";
                } else {
                    fee.textContent = feeValue;
                }

            } else {

                fee.textContent = feeValue;
            }
        }


        // Visiting Hours
        const hours =
            document.getElementById("visitingHours");

        if (hours) {

            const hoursValue =
                data.opening_hours ||
                data.hours ||
                "Not available";

            if (language === "hi") {

                hours.textContent =
                    hoursValue
                        .replace(/Opening Hours/gi, "भ्रमण का समय")
                        .replace(/Open/gi, "खुला")
                        .replace(/Closed/gi, "बंद");

            } else if (language === "mr") {

                hours.textContent =
                    hoursValue
                        .replace(/Opening Hours/gi, "भेट देण्याची वेळ")
                        .replace(/Open/gi, "उघडे")
                        .replace(/Closed/gi, "बंद");

            } else {

                hours.textContent = hoursValue;
            }
        }


        // Category
        const category =
            document.getElementById("category");

        if (category) {

            let categoryText =
                data.category ||
                "Heritage Place";

            if (language === "hi") {

                categoryText =
                    "ऐतिहासिक विरासत स्थल";

            } else if (language === "mr") {

                categoryText =
                    "ऐतिहासिक वारसा स्थळ";
            }

            category.textContent =
                categoryText;
        }


        // Extra Information
        const extraInfo =
            document.getElementById("extraInfo");

        if (extraInfo) {

            extraInfo.textContent =
                translatedPlace.history;
        }

    } else {

        // ==========================================
        // ENGLISH DATA
        // ==========================================

        if (data) {

            const description =
                document.getElementById("placeDescription");

            if (description) {
                description.textContent =
                    data.description ||
                    "Explore this historical heritage place.";
            }


            const history =
                document.getElementById("placeHistory");

            if (history) {
                history.textContent =
                    data.history ||
                    "Historical information is not available.";
            }


            const location =
                document.getElementById("placeLocation");

            if (location) {

                if (data.latitude && data.longitude) {

                    location.textContent =
                        "Latitude: " +
                        data.latitude +
                        ", Longitude: " +
                        data.longitude;

                } else {

                    location.textContent =
                        data.location ||
                        "Location not available";
                }
            }


            const fee =
                document.getElementById("entryFee");

            if (fee) {

                fee.textContent =
                    data.entry_fee ||
                    data.fee ||
                    "Not available";
            }


            const hours =
                document.getElementById("visitingHours");

            if (hours) {

                hours.textContent =
                    data.opening_hours ||
                    data.hours ||
                    "Not available";
            }


            const category =
                document.getElementById("category");

            if (category) {

                category.textContent =
                    data.category ||
                    "Heritage Place";
            }


            const extraInfo =
                document.getElementById("extraInfo");

            if (extraInfo) {

                extraInfo.textContent =
                    data.history ||
                    data.description ||
                    "Discover the historical importance and cultural significance of this heritage location.";
            }
        }
    }


    // ==========================================
    // CHANGE PAGE HEADINGS
    // ==========================================

    const descriptionTitle =
        document.getElementById("descriptionTitle");

    if (descriptionTitle) {
        descriptionTitle.textContent =
            detailText.description;
    }


    const historyTitle =
        document.getElementById("historyTitle");

    if (historyTitle) {
        historyTitle.textContent =
            detailText.history;
    }


    const locationTitle =
        document.getElementById("locationTitle");

    if (locationTitle) {
        locationTitle.textContent =
            detailText.location;
    }


    const feeTitle =
        document.getElementById("entryFeeTitle");

    if (feeTitle) {
        feeTitle.textContent =
            detailText.entryFee;
    }


    const hoursTitle =
        document.getElementById("visitingHoursTitle");

    if (hoursTitle) {
        hoursTitle.textContent =
            detailText.visitingHours;
    }


    const categoryTitle =
        document.getElementById("categoryTitle");

    if (categoryTitle) {
        categoryTitle.textContent =
            detailText.category;
    }


    const extraTitle =
        document.getElementById("extraInfoTitle");

    if (extraTitle) {
        extraTitle.textContent =
            detailText.extraInfo;
    }


    // ==========================================
    // CHANGE BUTTONS
    // ==========================================

    const mapButton =
        document.getElementById("viewMapButton");

    if (mapButton) {
        mapButton.textContent =
            detailText.viewMap;
    }


    const audioButton =
        document.getElementById("audioGuideButton");

    if (audioButton) {
        audioButton.textContent =
            detailText.audioGuide;
    }


    const saveButton =
        document.getElementById("savePlaceButton");

    if (saveButton) {
        saveButton.textContent =
            detailText.savePlace;
    }
}