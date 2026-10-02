document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    if (!registerForm) return;


    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message = document.getElementById("message");


        if (password !== confirmPassword) {

            message.innerText = "Passwords do not match.";

            return;
        }


        message.innerText = "Creating account...";


        try {

            const response = await fetch("/api/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })

            });


            const data = await response.json();


            if (!response.ok) {

                message.innerText =
                    data.error || "Registration failed.";

                return;
            }


            message.innerText =
                "Registration successful!";


            setTimeout(function () {

                window.location.href = "registration-success.html";

            }, 1500);


        } catch (error) {

            console.error("REGISTRATION ERROR:", error);

            message.innerText =
                "Unable to connect to server.";

        }

    });

});