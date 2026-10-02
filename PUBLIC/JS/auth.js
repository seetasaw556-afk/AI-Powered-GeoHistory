document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("message");

        message.innerText = "Logging in...";

        try {

            const response = await fetch("/api/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })

            });


            const data = await response.json();


            if (!response.ok) {

                message.innerText =
                    data.error || "Login failed.";

                return;
            }


            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.user)
            );


            message.innerText =
                "Login successful!";


            setTimeout(function () {

                window.location.href =
                    "../index.html";

            }, 1000);


        } catch (error) {

            console.error("LOGIN ERROR:", error);

            message.innerText =
                "Unable to connect to server.";

        }

    });

});