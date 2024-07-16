const mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to Database!");
});
module.exports = con;
