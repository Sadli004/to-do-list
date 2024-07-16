const { default: isEmail } = require("validator/lib/isEmail");
const db = require("../Config/db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register
module.exports.signUp = async (req, res) => {
  const username = req.body.username;
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(req.body.password, salt);
  const Email = req.body.Email;
  if (!isEmail(Email)) {
    console.log("Send a valid email");
  } else {
    const query =
      "INSERT INTO users (Username, Email, Password) VALUES (?,?,?)";
    const values = [username, Email, password];
    db.query(query, values, (err, result) => {
      if (err) {
        res.status(500).send("Internal server error");
        console.log("Query error :", err);
      } else {
        res.send(result);
      }
    });
  }
};
// LOGIN
module.exports.signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const query = `SELECT * FROM users WHERE Email = ?`;
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Query error:", err);
      return res.status(500).send("Internal server error");
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userId = results[0].UserID;

    bcrypt.compare(password, results[0].Password, (err, result) => {
      if (err) {
        console.error("Password comparison error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!result) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const secret = process.env.TOKEN_SECRET;
      jwt.sign({ user: userId }, secret, { expiresIn: "3d" }, (err, token) => {
        if (err) {
          console.error("Token signing error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          // domain: "localhost:3000",
        });

        res.json({ message: "User logged in", token });
      });
    });
  });
};

//Logout
module.exports.logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  // Respond with a success message
  res.json({ message: "User logged out" });
};
