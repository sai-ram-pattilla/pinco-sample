const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors")

const app = express();
const port = 3000;


app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sairam@123456",
    database: "users_db"
});

db.connect(err => {
    if (err) {
        console.log("DB Connection Failed:", err);
        return;
    }
    console.log("DB Connection Successful");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


app.post("/register", async (request, response) => {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({ error: "All fields are required!" });
        }

        //console.log("Received Data:", name, email, password);

        
        const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        db.query(checkEmailQuery, [email], async (err, results) => {
            if (err) {
                console.error("Database Error:", err);
                return response.status(500).json({ error: "Database error" });
            }

            if (results.length > 0) {
                return response.status(400).json({ error: "Email already registered!" });
            }

    
            const encryptedPassword = await bcrypt.hash(password, 10);
            const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(sql, [name, email, encryptedPassword], (error, result) => {
                if (error) {
                    console.error("Error inserting user:", error);
                    return response.status(500).json({ error: "Error registering user" });
                }
                response.status(201).json({ message: "User registered successfully" });
            });
        });
    } catch (err) {
        console.error("Server Error:", err);
        response.status(500).json({ error: "Internal Server Error" });
    }
});


// Sign in logic
app.post("/login", (request,response) =>{
    const {email,password} = request.body

    if (!email || !password) {
        return response.status(400).json({ error: "Email and password are required!" });
    }

    const sql = "select * from users where email = ?"
    db.query(sql,[email], async(error,result) =>{
        if (error){
          console.error("Database Error:", error)
          return response.status(500).json({ error: "Database error" });
        }
        
        if (result.length === 0) {
            return response.status(401).json({ error: "Invalid email or password!" });
        }

        const user = result[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ error: "Invalid email or password!" });
        }

        response.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
        console.log(user.name)

    })
});