// ==========================================
// MULTILINGUAL SUPPORT
// ==========================================

const translations = {

    en: {
        home: "Home",
        explore: "Explore Places",
        map: "Map",
        assistant: "AI Assistant",
        login: "Login",

        title: "Explore Heritage Places",

        description:
            "Discover historical and cultural places around you.",

        notification:
            "Smart Heritage Notification",

        detect:
            "📍 Detect My Location",

        enable:
            "🔔 Enable Smart Notifications"
    },

    hi: {
        home: "होम",
        explore: "विरासत स्थल देखें",
        map: "मानचित्र",
        assistant: "AI सहायक",
        login: "लॉगिन",

        title:
            "विरासत स्थल देखें",

        description:
            "अपने आसपास के ऐतिहासिक और सांस्कृतिक स्थानों को खोजें।",

        notification:
            "स्मार्ट विरासत सूचना",

        detect:
            "📍 मेरी लोकेशन खोजें",

        enable:
            "🔔 स्मार्ट नोटिफिकेशन चालू करें"
    },

    mr: {
        home: "होम",
        explore: "वारसा स्थळे पहा",
        map: "नकाशा",
        assistant: "AI सहाय्यक",
        login: "लॉगिन",

        title:
            "वारसा स्थळे पहा",

        description:
            "तुमच्या आसपासची ऐतिहासिक आणि सांस्कृतिक ठिकाणे शोधा.",

        notification:
            "स्मार्ट वारसा सूचना",

        detect:
            "📍 माझे स्थान शोधा",

        enable:
            "🔔 स्मार्ट नोटिफिकेशन सुरू करा"
    }
};


function changeLanguage() {

    const language =
        document.getElementById("languageSelector").value;

    // Save selected language
    localStorage.setItem("selectedLanguage", language);

    const text = translations[language];

    if (!text) {
        return;
    }


    // ==========================================
    // NAVIGATION BAR
    // ==========================================

    const homeLink =
        document.querySelector('a[href="../index.html"]');

    if (homeLink) {
        homeLink.textContent = text.home;
    }


    const exploreLink =
        document.querySelector('a[href="places.html"]');

    if (exploreLink) {
        exploreLink.textContent = text.explore;
    }


    const mapLink =
        document.querySelector('a[href="map.html"]');

    if (mapLink) {
        mapLink.textContent = text.map;
    }


    const assistantLink =
        document.querySelector('a[href="assistant.html"]');

    if (assistantLink) {
        assistantLink.textContent = text.assistant;
    }


    const loginLink =
        document.querySelector('a[href="../login.html"]');

    if (loginLink) {
        loginLink.textContent = text.login;
    }


    // ==========================================
    // EXPLORE PLACES TITLE
    // ==========================================

    const title =
        document.querySelector(".heritage-section h2");

    if (title) {
        title.textContent = text.title;
    }


    // ==========================================
    // EXPLORE PLACES DESCRIPTION
    // ==========================================

    const description =
        document.querySelector(".heritage-section > p");

    if (description) {
        description.textContent = text.description;
    }


    // ==========================================
    // SMART NOTIFICATION TITLE
    // ==========================================

    const notificationTitle =
        document.querySelector(".location-section h2");

    if (notificationTitle) {
        notificationTitle.textContent =
            text.notification;
    }


    // ==========================================
    // SMART NOTIFICATION BUTTONS
    // ==========================================

    const buttons =
        document.querySelectorAll(
            ".location-section button"
        );

    if (buttons.length >= 2) {

        buttons[0].textContent =
            text.detect;

        buttons[1].textContent =
            text.enable;
    }
}


// ==========================================
// LOAD SAVED LANGUAGE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const savedLanguage =
        localStorage.getItem("selectedLanguage");

    if (savedLanguage) {

        const selector =
            document.getElementById("languageSelector");

        if (selector) {

            selector.value = savedLanguage;

            changeLanguage();

            // Change language on place details page
            if (
                typeof changePlaceDetailsLanguage ===
                "function"
            ) {
                changePlaceDetailsLanguage();
            }
        }
    }
});