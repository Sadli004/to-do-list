const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({ message: "No token" });
  } else {
    const secret = process.env.TOKEN_SECRET;
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.clearCookie("jwt");
        res.status(403).json({ message: "Unauthorized" });
      } else {
        req.user = decodedToken.user;
        next();
      }
    });
  }
};

module.exports.verifyToken = verifyToken;
