const { default: isEmail } = require('validator/lib/isEmail');
const db = require('../Config/db');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register
module.exports.signUp = async (req, res) => {
    const username = req.body.username;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const BirthDate = req.body.BirthDate;
    const Email = req.body.Email;
    if(!isEmail(Email)){
        console.log('Send a valid email');
    }
    else{
    const query = "INSERT INTO users (Username, Email, Password, FirstName, LastName, BirthDate, Role) VALUES (?,?,?,?,?,?, 'Membre')";
    const values = [username, Email, password, FirstName, LastName, BirthDate];
    db.query(query,values,(err,result)=>{
        if(err){
            res.status(500).send("Internal server error")
            console.log("Query error :" ,err);
       }
        else {
            res.send(result)
        }
    });
    
    }
}
// LOGIN
module.exports.signIn = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = `SELECT * FROM users WHERE Username = ?`;
    db.query(query, [username], (err, results) => {
        if (err) {
            console.log("Query error : ", err);
            res.status(500).send("Internal server error")
        }
        else {
            bcrypt.compare(password, results[0].Password, (err, result) => {
                if (err) {
                    console.log("error: ", err)
                }
                else {
                    console.log("Token secret", process.env.TOKEN_SECRET);
                    const secret = process.env.TOKEN_SECRET;
                    jwt.sign({ username: username }, secret, { expiresIn: '3d' }, (err, token) => {
                        if (err) { console.log("token error: ", err) }
                        else {
                            res.cookie(
                                "jwt", token, { httpOnly: true, secure: true, sameSite: 'none', expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) }
                            )
                            res.json({ message: "User logged in", token });
                        }
                    })
                }
            })
        }
    })
}

//Logout
module.exports.logout = (req,res)=>{
    // Clear the token cookie
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
    // Respond with a success message
    res.json({ message: 'User logged out' });
}