const { query } = require('express');
const db = require('../Config/db')
module.exports.getAllTasks = (req,res) => {
    var query = "SELECT * FROM tasks";
    db.query(query,(err,result)=>{
        if(err){
            console.error("Query error : ", err);
            res.status(500).send("Internal server error");
        }else{
            res.send(result);
        }
    })
} 
module.exports.getTask = (req,res) => {
    const taskId = req.params.id;
    var query = "SELECT * FROM tasks WHERE TaskID = ?";
    db.query(query,[taskId],(err,result)=>{
        if(err){
            console.error("Query error : ", err);
            res.status(500).send("Internal server error");
        }else{
            res.send(result);
        }
    })
}
module.exports.createTask = (req, res) => {
    const title =req.body.title;
    const description = req.body.description;
    const userId = req.body.userId;
    const values = [userId , title , description];
    console.log(values);
    const query = "INSERT INTO tasks (UserID, Title, Description) VALUES ?";
    db.query(query ,[values], (err, result) => {
        if (err) {
            console.error("Query error : ", err);
            res.status(500).send("Internal server error");
        } else {
            res.send(result);
        }
    } )
};

module.exports.deleteTask = (req, res) => {
    const taskId = req.params.id;
    const query = "DELETE FROM tasks WHERE TaskID = ?";
    db.query(query, [taskId], (err, result) => {
        if (err) {
            console.error("Query error : ", err);
            res.status(500).send("Internal server error");
        } else {
            res.send(result);
        }
    });
};
