const router = require('express').Router();
const userController = require('../Controllers/userController');
const authController = require('../Controllers/authController');
//Login
router.post('/login',authController.signIn);
//Register
router.post('/register',authController.signUp);
//Logout
router.post('/logout',authController.logout);
// get all users
router.get('/',userController.getAllUsers);
// get a user
router.get('/:id',userController.getUser);
// History
router.get('/history/:userId',userController.viewHistory)
module.exports = router;