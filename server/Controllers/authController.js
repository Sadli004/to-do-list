const { default: isEmail } = require("validator/lib/isEmail");
const db = require("../Config/db");
require("dotenv").config();
const bcrypt = require("bcrypt");

const { CreateJWT } = require("../Middleware/authmiddleware");

// Register
module.exports.signUp = async (req, res) => {
  try {
    const { username, password, Email } = req.body;

    if (!username || !password || !Email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isEmail(Email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const query =
      "INSERT INTO users (Username, Email, Password) VALUES (?,?,?)";
    const values = [username, Email, hashedPassword];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res
          .status(500)
          .json({ message: "Database error occurred while registering user" });
      }
      const token = CreateJWT(result[0].UserID);
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      });

      return res.status(201).json({
        message: "User registered successfully",
        result: { id: result.insertId },
      });
    });
  } catch (error) {
    console.error("Sign up error:", error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred during registration" });
  }
};

// Login
module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const query = "SELECT * FROM users WHERE Email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res
          .status(500)
          .json({ message: "Database error occurred while logging in" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Email not found" });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.Password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = CreateJWT(results[0].UserID);
      res.cookie("jwt", token, {
        httpOnly: true,

        sameSite: "Strict",
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      });

      res.json({ message: "User logged in successfully", token });
    });
  } catch (error) {
    console.error("Sign in error:", error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred during login" });
  }
};

// Logout
module.exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "Strict",
    });
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred during logout" });
  }
};
