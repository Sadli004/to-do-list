const db = require('../Config/db');

//get all users
module.exports.getAllUsers = (req,res)=> {
    const query = "SELECT * FROM users";
    db.query(query,(err,result)=>{
        if(err){
            console.error("Query error : ", err);
            res.status(500).send("Internal server error");
        }else{
            res.send(result);
        }
    })
}
// get a user
module.exports.getUser = (req,res)=> {
    const UserID = req.params.UserID;
    const query = "SELECT * FROM users WHERE UserID = ?";
    db.query(query,[UserID],(err,result)=>{
        if(err){
            console.error("Query error : ", err);
            res.status(500).send("Internal server error");
        }else{
            res.send(result);
        }
    })
}
// View User History
module.exports.viewHistory = (req,res) => {
    const userId = req.params.userId;
    const query = "SELECT * FROM taskHistory WHERE UserID = ?";
    db.query(query,[userId],(err,result) => {
        if(err){
            console.error("Query error : ", err);
            res.status(500).send("Internal server error");
        }else{
            res.send(result);
        }
    })
}