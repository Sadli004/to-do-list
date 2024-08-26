const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
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

module.exports.CreateJWT = (email) => {
  const secret = process.env.TOKEN_SECRET;
  const payload = { user: email };
  try {
    const token = jwt.sign(payload, secret, {
      expiresIn: "3d",
    });
    return token;
  } catch (error) {
    console.error("Token signing error:", error);
    throw new Error("Error occurred while generating token");
  }
};
module.exports.setHttpCookie = (token) => {
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  });
};
