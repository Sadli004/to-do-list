const router = require("express").Router();
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
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
// History
router.get("/history", verifyToken, userController.viewHistory);
// Today history
router.get("/history/d/0", verifyToken, userController.viewDay);
module.exports = router;
