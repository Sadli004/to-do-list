const router = require("express").Router();
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
const {
  googleAuth,
  googleCallback,
} = require("../Controllers/OAuthController");
const { verifyToken } = require("../Middleware/authmiddleware");
//Login
router.post("/login", authController.signIn);
//Register
router.post("/register", authController.signUp);
//Logout
router.get("/logout", authController.logout);
// get all users
// router.get("/", userController.getAllUsers);
// get a user
router.get("/", verifyToken, userController.getUser);
// Today history
router.get("/history/d/0", verifyToken, userController.viewDay);

// google auth
router.post("/auth/google", googleAuth);
router.get("/oauth", googleCallback);
module.exports = router;
