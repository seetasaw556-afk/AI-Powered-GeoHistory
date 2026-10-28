require("dotenv").config();

const express = require("express");
const path = require("path");
const db = require("./server/database");
const { askHeritageAI } = require("./server/ai");
const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ==========================================
// LOGIN ROUTE
// ==========================================

app.post("/api/login", (req, res) => {

const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            error: "Email and password are required"
        });

    }

    const sql =
        "SELECT id, name, email, role FROM users WHERE email = ? AND password = ?";

    db.query(
        sql,
        [email, password],
        (err, results) => {
            if (err) {
                console.error(
                    "LOGIN DATABASE ERROR:",
                    err
                );
                return res.status(500).json({
                    error: "Database error"
                });

            }

            if (results.length === 0) {

                return res.status(401).json({
                    error: "Invalid email or password"
                });

            }

            res.json({
                message: "Login successful",
                user: results[0]
            });

        }
    );

});

// ==========================================
// REGISTRATION ROUTE
// ==========================================

app.post("/api/register", (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

        return res.status(400).json({
            error: "All fields are required"
        });

    }

    const checkSql =
        "SELECT id FROM users WHERE email = ?";

    db.query(
        checkSql,
        [email],
        (err, results) => {

            if (err) {

                console.error(
                    "REGISTER CHECK ERROR:",
                    err
                );

                return res.status(500).json({
                    error: "Database error"
                });

            }

            if (results.length > 0) {

                return res.status(409).json({
                    error: "Email already registered"
                });

            }

            const insertSql = `
                INSERT INTO users
                (name, email, password, role)
                VALUES (?, ?, ?, ?)
            `;

            db.query(
                insertSql,
                [name, email, password, "user"],
                (err, result) => {

                    if (err) {

                        console.error(
                            "REGISTER DATABASE ERROR:",
                            err
                        );

                        return res.status(500).json({
                            error: "Unable to create account"
                        });

                    }

                    console.log(
                        "USER REGISTERED:",
                        email
                    );

                    res.status(201).json({

                        message:
                            "Registration successful",

                        user: {
                            id: result.insertId,
                            name: name,
                            email: email,
                            role: "user"
                        }

                    });

                }
            );

        }
    );

});

// ==========================================
// HERITAGE PLACES ROUTE
// ==========================================

app.get("/api/places", (req, res) => {

    const sql = "SELECT * FROM heritage_places";

    db.query(sql, (err, results) => {

        if (err) {

            console.error("PLACES DATABASE ERROR:", err);

            return res.status(500).json({
                error: "Unable to load heritage places"
            });
        }
        console.log("Heritage places loaded:", results);

        res.json(results);
    });

});

// ==========================================
// AI ROUTE
// ==========================================

app.post("/api/ai", async (req, res) => {

    try {
        const { question } = req.body;

        console.log("AI API route called");

        console.log(
            "Question:",
            question
        );

        if (!question) {

            return res.status(400).json({
                error: "Question is required"
            });

        }

        const answer =
            await askHeritageAI(question);

        return res.json({
            answer: answer
        });

    } catch (error) {
console.error(
            "AI ROUTE ERROR:",
            error
        );

        return res.status(500).json({
            error:
                error.message ||
                "AI request failed"
        });

    }

});

// ==========================================
// WEBSITE ROUTE
// ==========================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );
app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/pages/register.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "register.html"));
});

app.get("/pages/registration-success.html", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "pages", "registration-success.html")
    );
});

});

app.post("/api/admin/login", (req, res) => {

    const { email, password } = req.body;

    const sql =
        "SELECT * FROM admins WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, results) => {

        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin email or password"
            });
        }

        res.json({
            success: true,
            message: "Admin login successful",
            admin: results[0]
        });
    });
});
app.get("/api/admin/places", (req, res) => {

    const sql = "SELECT * FROM heritage_places";

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Unable to load places"
            });
        }

        res.json({
            success: true,
            places: results
        });
    });
});
app.post("/api/admin/places", (req, res) => {

    const {
        name,
        description,
        history,
        location,
        latitude,
        longitude,
        entry_fee,
        opening_hours,
        category,
        image
    } = req.body;

    const sql = `
        INSERT INTO heritage_places
        (name, description, history, location, latitude, longitude,
         entry_fee, opening_hours, category, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            description,
            history,
            location,
            latitude,
            longitude,
            entry_fee,
            opening_hours,
            category,
            image
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Unable to add place"
                });
            }

            res.json({
                success: true,
                message: "Heritage place added successfully",
                id: result.insertId
            });
        }
    );
});

app.put("/api/admin/places/:id", (req, res) => {

    const { id } = req.params;

    const {
        name,
        description,
        history,
        location,
        latitude,
        longitude,
        entry_fee,
        opening_hours,
        category,
        image
    } = req.body;

    const sql = `
        UPDATE heritage_places
        SET
        name = ?,
        description = ?,
        history = ?,
        location = ?,
        latitude = ?,
        longitude = ?,
        entry_fee = ?,
        opening_hours = ?,
        category = ?,
        image = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            name,
            description,
            history,
            location,
            latitude,
            longitude,
            entry_fee,
            opening_hours,
            category,
            image,
            id
        ],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Unable to update place"
                });
            }

            res.json({
                success: true,
                message: "Place updated successfully"
            });
        }
    );
});

app.delete("/api/admin/places/:id", (req, res) => {

    const { id } = req.params;

    const sql =
        "DELETE FROM heritage_places WHERE id = ?";

    db.query(sql, [id], (err) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Unable to delete place"
            });
        }

        res.json({
            success: true,
            message: "Place deleted successfully"
        });
    });
});

app.get("/api/admin/users", (req, res) => {

    const sql =
        "SELECT name, email, role, created_at FROM users";

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Unable to load users"
            });
        }

        res.json({
            success: true,
            users: results
        });
    });
});
app.get("/api/admin/user-stats", (req, res) => {
    const sql = `
        SELECT 
            DATE(created_at) AS date,
            COUNT(*) AS count
        FROM users
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("User stats error:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to load user statistics"
            });
        }

        res.json({
            success: true,
            stats: results
        });
    });
});
// ==========================================
// START SERVER
// ==========================================

app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Server running at http://localhost:${PORT}`
        );

    }
);
