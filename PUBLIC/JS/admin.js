document.addEventListener("DOMContentLoaded", function () {
    loadPlaces();
    loadUsers();
});


function loadPlaces() {

    fetch("/api/admin/places")
        .then(response => response.json())
        .then(data => {

            if (!data.success) {
                alert("Unable to load places");
                return;
            }

            const table =
                document.getElementById("placesTable");

            table.innerHTML = "";

            data.places.forEach(place => {

                table.innerHTML += `
                    <tr>
                        <td>${place.name}</td>
                        <td>${place.category || ""}</td>
                        <td>${place.location || ""}</td>
                        

                        <td>
                            <button onclick="editPlace(${place.id})">
                                Edit
                            </button>

                            <button onclick="deletePlace(${place.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => {
            console.error(error);
            alert("Unable to connect to server");
        });
}


function loadUsers() {

    fetch("/api/admin/users")
        .then(response => response.json())
        .then(data => {

            if (!data.success) {
                alert("Unable to load users");
                return;
            }

            const table =
                document.getElementById("usersTable");

            table.innerHTML = "";

            data.users.forEach(user => {

                table.innerHTML += `
                    <tr>
                        <td>${user.name || ""}</td>
                        <td>${user.email || ""}</td>
                        <td>${user.role || ""}</td>
                        <td>${user.created_at || ""}</td>
                    </tr>
                `;

            });

            document.getElementById("userCount").textContent =
                data.users.length;
        })
        .catch(error => {

            console.error(error);
            alert("Unable to connect to server");

        });
}

function deletePlace(id) {

    if (!confirm("Are you sure you want to delete this place?")) {
        return;
    }

    fetch(`/api/admin/places/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {

        alert(data.message);

        if (data.success) {
            loadPlaces();
        }
    })
    .catch(error => {
        console.error(error);
        alert("Unable to delete place");
    });
}
function loadUserRegistrationChart() {

    fetch("/api/admin/user-stats")
        .then(response => response.json())
        .then(data => {

            if (!data.success) {
                console.error("Unable to load user statistics");
                return;
            }

            const labels = data.stats.map(item => item.date);
            const counts = data.stats.map(item => item.count);

            const canvas =
                document.getElementById("userRegistrationChart");

            if (!canvas) {
                console.error("Chart canvas not found");
                return;
            }

            const ctx = canvas.getContext("2d");

            new Chart(ctx, {
                type: "line",

                data: {
                    labels: labels,

                    datasets: [{
                        label: "Registered Users",
                        data: counts,
                        borderWidth: 2,
                        fill: false,
                        tension: 0.3
                    }]
                },

                options: {
                    responsive: true,

                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            },
                            title: {
                                display: true,
                                text: "Number of Users"
                            }
                        },

                        x: {
                            title: {
                                display: true,
                                text: "Registration Date"
                            }
                        }
                    }
                }
            });
        })

        .catch(error => {
            console.error("User chart error:", error);
        });
}
document.addEventListener("DOMContentLoaded", function () {
    loadUserRegistrationChart();
});