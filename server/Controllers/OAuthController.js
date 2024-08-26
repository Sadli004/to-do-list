const db = require("../Config/db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { CreateJWT, setHttpCookie } = require("../Middleware/authmiddleware");
// Google auth
module.exports.googleAuth = async (req, res) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectUrl = `http://localhost:${process.env.PORT}/api/user/oauth`;
  const OAuthClient = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: redirectUrl,
  });
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "openid",
  ];
  const authorizationUrl = await OAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
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

    const tokenResponse = await oAuth2Client.getToken(code);

    if (!tokenResponse.tokens) {
      console.log("No tokens found in tokenResponse");
    } else {
      const accessToken = tokenResponse.tokens.access_token;

      const userInfo = await getGoogleUserInfo(accessToken);
      // const UserID = userInfo.id;
      const Username = userInfo.name;
      const Email = userInfo.email;
      db.query("SELECT * FROM users WHERE Email = ?", Email, (err, users) => {
        if (users.length > 0) {
          console.log("user already exists");
          const token = CreateJWT(users[0].UserID);
          res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "Strict",
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          });
          console.log("user set to be logged in");

          return res.redirect(`${process.env.CLIENT_URL}/`);
        } else {
          console.log("user must be signed in");

          db.query(
            "INSERT INTO users (Username,Email) VALUES ( ?, ?)",
            [Username, Email],
            (err, results) => {
              if (err) {
                return res.status(500).json({ message: err.message });
              } else {
                console.log("user created successfully");
                const token = CreateJWT(results.insertedId);
                res.cookie("jwt", token, {
                  httpOnly: true,

                  sameSite: "Strict",
                  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                });
                return res.redirect(`${process.env.CLIENT_URL}/`);
              }
            }
          );
        }
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
