const { default: isEmail } = require("validator/lib/isEmail");
const db = require("../Config/db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
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
      res.status(201).json({ message: "User registered successfully", result });
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

      const secret = process.env.TOKEN_SECRET;
      jwt.sign(
        { user: user.UserID },
        secret,
        { expiresIn: "3d" },
        (err, token) => {
          if (err) {
            console.error("Token signing error:", err);
            return res
              .status(500)
              .json({ message: "Error occurred while generating token" });
          }

          res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          });

          res.json({ message: "User logged in successfully", token });
        }
      );
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
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred during logout" });
  }
};

// Google auth
module.exports.googleAuth = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectUrl = `http://localhost:${process.env.PORT}/api/user/oauth`;
  const OAuthClient = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: redirectUrl,
  });
  const authorizationUrl = await OAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });
  res.status(200).json({ url: authorizationUrl });
};
// function to get user info from google
const getGoogleUserInfo = async (token) => {
  const url = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
};
// Google callback
module.exports.googleCallback = async (req, res, next) => {
  const { code } = req.query;

  try {
    const redirectUrl = `http://localhost:${process.env.PORT}/api/user/oauth`;
    const oAuth2Client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: redirectUrl,
    });

    console.log("redirect url", redirectUrl);
    console.log("code", code);

    const tokenResponse = await oAuth2Client.getToken(code);
    // console.log("tokenResponse", tokenResponse);

    if (!tokenResponse.tokens) {
      console.log("No tokens found in tokenResponse");
    } else {
      const accessToken = tokenResponse.tokens.access_token;

      const userInfo = await getGoogleUserInfo(accessToken);

      res.status(200).json({ message: "User authenticated successfully" });
    }
  } catch (error) {
    console.log("google callback error:", error.message);
  }
};
